import { PineconeClient, Vector } from "@pinecone-database/pinecone";
import Bottleneck from "bottleneck";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { TokenTextSplitter } from "langchain/text_splitter";
import { uuid } from "uuidv4";

const limiter = new Bottleneck({
  minTime: 2000
});

let pinecone: PineconeClient | null = null

const initPineconeClient = async () => {
  pinecone = new PineconeClient();
  console.log("init pinecone")
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
}

type Response = {
  message: string
}

const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

const sliceIntoChunks = (arr: Vector[], chunkSize: number) => {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
    arr.slice(i * chunkSize, (i + 1) * chunkSize)
  );
};

export default defineEventHandler(async (event) => {

  if (!process.env.PINECONE_INDEX_NAME) {
    throw createError({
      statusCode: 500,
      statusMessage: "PINECONE_INDEX_NAME not set",
    })
  }

  const { messages } = await readBody(event);
  const pineconeIndexName = process.env.PINECONE_INDEX_NAME

  if (!pinecone) {
    await initPineconeClient();
  }

  const pages = [
    {
      content: `${messages[0].role}: ${messages[0].content}\n${messages[1].role}: ${messages[1].content}`,
      created_at: messages[0].created_at,
    }
  ]

  const documents = await Promise.all(pages.map((row) => {
    const splitter = new TokenTextSplitter({
      encodingName: "gpt2",
      chunkSize: 300,
      chunkOverlap: 20,
    });

    const docs = splitter.splitDocuments([
      new Document({ pageContent: row.content, metadata: { created_at: row.created_at, text: truncateStringByBytes(row.content, 36000) } }),
    ]);
    return docs
  }))

  const index = pinecone && pinecone.Index(pineconeIndexName);
  const embedder = new OpenAIEmbeddings({
    modelName: "text-embedding-ada-002"
  })

  //Embed the documents
  const getEmbeddings = async () => {
    return await Promise.all(documents.flat().map(async doc => {
      const embedding = await embedder.embedQuery(doc.pageContent)
      console.log("done embedding")
      return {
        id: uuid(),
        values: embedding,
        metadata: {
          chunk: doc.pageContent,
          text: doc.metadata.text as string,
          created_at: doc.metadata.created_at as string,
        }
      } as Vector
    }))
  }

  let vectors: Vector[] = []

  try {
    vectors = await limiter.schedule(getEmbeddings) as unknown as Vector[]
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: JSON.stringify(e),
    })
  }

  const chunks = sliceIntoChunks(vectors, 10)

  await Promise.all(chunks.map(async chunk => {
    index && await index.upsert({
      upsertRequest: {
        vectors: chunk as Vector[]
      }
    })
  }))

  return { message: "Done" }
})