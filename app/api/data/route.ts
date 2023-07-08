import { NextResponse } from 'next/server'
import { init } from '@/utils/vectorStore'

const vectorStore = await init()

export async function POST(req: Request) {
  const data = await req.formData()
  const file = data.get('file')

  const blob = new Blob([file!], { type: (file as any)?.type })
  await vectorStore.save2VectorStore(blob)
  return NextResponse.json('ok')
}
