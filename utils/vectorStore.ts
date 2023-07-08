import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeClient } from '@pinecone-database/pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'

if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone environment or api key vars missing')
}

class VectorStore {
  client: PineconeClient
  constructor() {
    this.client = new PineconeClient()
  }
  async save2VectorStore(blob: Blob) {
    try {
      /*load raw docs from the all files in the directory */
      const pdfLoader = new PDFLoader(blob)

      // const loader = new PDFLoader(filePath);
      const rawDocs = await pdfLoader.load()
      /* Split text into chunks */
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 100
      })

      const docs = await textSplitter.splitDocuments(rawDocs)
      console.log('split docs', docs)

      console.log('creating vector store...')
      /*create and store the embeddings in the vectorStore*/
      const embeddings = new OpenAIEmbeddings()
      await this.client.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!
      })
      const pineconeIndex = this.client.Index(process.env.PINECONE_INDEX!)
      await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex
      })
    } catch (error) {
      console.log('error', error)
      throw new Error('Failed to ingest your data')
    }
  }
}
export async function init() {
  try {
    const vectorStore = new VectorStore()

    await vectorStore.client.init({
      environment: process.env.PINECONE_ENVIRONMENT ?? '', //this is in the dashboard
      apiKey: process.env.PINECONE_API_KEY ?? ''
    })

    return vectorStore
  } catch (error) {
    console.log('error', error)
    throw new Error('Failed to initialize Pinecone Client')
  }
}
