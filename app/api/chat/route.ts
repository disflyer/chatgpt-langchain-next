import { ConversationalRetrievalQAChain } from 'langchain/chains'
import { init } from '@/utils/vectorStore'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { NextResponse } from 'next/server'

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:`

const vectorStore = await init()
export async function POST(req: Request) {
  const json = await req.json()
  const { messages } = json
  const question = messages[messages.length - 1].content
  const embeddings = new OpenAIEmbeddings()

  const index = vectorStore.client.Index(process.env.PINECONE_INDEX!)

  const pineconeStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    textKey: 'text'
  })

  const llm = new ChatOpenAI({
    temperature: 0.1,
    modelName: 'gpt-3.5-turbo' //change this to gpt-4 if you have access
  })
  const chain = ConversationalRetrievalQAChain.fromLLM(
    llm,
    pineconeStore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      returnSourceDocuments: true
    }
  )

  const res = await chain.call({ question, chat_history: [] })
  return NextResponse.json(res.text)
}
