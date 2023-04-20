import { PineconeClient } from "@pinecone-database/pinecone";
import { LLMChain } from "langchain/chains";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { Metadata, getMatchesFromEmbeddings } from "../../utils/memory_chat/matches";
import { summarizeLongDocument } from "../../utils/memory_chat/summarizer";
import templates from "../../utils/memory_chat/templates";

const llm = new OpenAI({});
let pinecone: PineconeClient | null = null

const initPineconeClient = async () => {
  pinecone = new PineconeClient();
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
}

export default defineEventHandler(async (event) => {
  const { user_id } = getQuery(event) as any
  const { conversationHistory, prompt } = await readBody(event)

  if (!user_id || !prompt) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing user id or prompt',
    })
  }

  if (!pinecone) {
    await initPineconeClient();
  }

  try {
    // Build an LLM chain that will improve the user prompt
    const inquiryChain = new LLMChain({
      llm, prompt: new PromptTemplate({
        template: templates.inquiryTemplate,
        inputVariables: ["userPrompt", "conversationHistory"],
      })
    });
    const inquiryChainResult = await inquiryChain.call({ userPrompt: prompt, conversationHistory })
    const inquiry = inquiryChainResult.text

    // Embed the user's intent and query the Pinecone index
    const embedder = new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002"
    });

    const embeddings = await embedder.embedQuery(inquiry);

    const matches = await getMatchesFromEmbeddings(embeddings, pinecone!, 3);

    const urls = matches && Array.from(new Set(matches.map(match => {
      const metadata = match.metadata as Metadata
      const { url } = metadata
      return url
    })))

    const fullDocuments = matches && Array.from(
      matches.reduce((map, match) => {
        const metadata = match.metadata as Metadata;
        const { text, url } = metadata;
        if (!map.has(url)) {
          map.set(url, text);
        }
        return map;
      }, new Map())
    ).map(([_, text]) => text);

    // const chunkedDocs = matches && Array.from(new Set(matches.map(match => {
    //   const metadata = match.metadata as Metadata
    //   const { chunk } = metadata
    //   return chunk
    // })))

    // const summary = chunkedDocs!.join("\n")

    const summary = await summarizeLongDocument(fullDocuments!.join("\n"), inquiry)

    return {
      summary,
      urls,
      conversationHistory,
      prompt,
      template: templates.qaTemplate,
    }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error',
    })
  }
})