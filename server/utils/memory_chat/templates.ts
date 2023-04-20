const templates = {
  qaTemplate: `Answer the question based on the context below. You should follow ALL the following rules when generating and answer:
        - There will be a CONVERSATION LOG, CONTEXT, and a QUESTION.
        - Your main goal is to provide the user with an answer that is relevant to the question based on the CONTEXT you are given.
        - Take into account the entire conversation so far, marked as CONVERSATION LOG, but prioritize the CONTEXT.
        - Do not make up any answers if the CONTEXT does not have relevant information.
        - The CONTEXT is a set of JSON objects, each includes the field "text" where the content is stored, and "created_at" when the page is created.
        - Do not mention the CONTEXT or the CONVERSATION LOG in the answer, but use them to generate the answer.
        - ALWAYS prefer the result with the highest "score" value.
        - Summarize the CONTEXT to make it easier to read, but don't omit any information.

        CONVERSATION LOG: {conversationHistory}

        CONTEXT: {summaries}

        QUESTION: {question}

        Final Answer: `,
  summarizerTemplate: `Shorten the text in the CONTENT, attempting to answer the INQUIRY. You should follow the following rules when generating the summary:
    - The summary will answer the INQUIRY. If it cannot be answered, the summary should be empty.
    - If the INQUIRY cannot be answered, the final answer should be empty.
    - The summary should be under 4000 characters.

    INQUIRY: {inquiry}
    CONTENT: {document}

    Final answer:
    `,
  inquiryTemplate: `Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
    You should follow the following rules when generating and answer:
    - Always prioritize the user prompt over the conversation log.
    - Ignore any conversation log that is not directly related to the user prompt.
    - Only attempt to answer if a question was posed.
    - The question should be a single sentence
    - You should remove any punctuation from the question
    - You should remove any words that are not relevant to the question
    - If you are unable to formulate a question, respond with the same USER PROMPT you got.

    USER PROMPT: {userPrompt}

    CONVERSATION LOG: {conversationHistory}

    Final answer:
    `,
}

export default templates