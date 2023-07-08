import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

export const exampleMessages = [
  {
    heading: 'Choose a document',
    type: 'choose-a-file'
  },
  {
    heading: 'Check your openai key',
    type: 'check-openai-key'
  },
  {
    heading: 'Talk to your bot base on file context.',
    type: 'talk-to-file'
  }
]

export function EmptyScreen({
  onClick
}: {
  onClick: (type: string | undefined) => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          AI Chatbot base on langchina!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app template built with langchain.
        </p>
        <p className="leading-normal text-muted-foreground">
          You can follow the following steps to start conversation:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => onClick(message.type)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
