'use client'

import { useChat, type Message } from 'ai/react'

import { cn, fetcher } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen, exampleMessages } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectValue
} from './ui/select'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [loaderType, setLoaderType] = useState<string>()
  const [fileDialog, setFileDialog] = useState(false)
  const [fileIput, setFileIput] = useState<File | undefined>()
  const [embedingLoading, setEmbedingLoading] = useState(false)
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id
      }
    })
  console.debug('isLoading', isLoading)
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen
            onClick={type => {
              if (type === exampleMessages[0].type) {
                setFileDialog(true)
              }
            }}
          />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />

      <Dialog open={fileDialog} onOpenChange={setFileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose your file to build chatbot</DialogTitle>
          </DialogHeader>

          <Select
            value={loaderType}
            onValueChange={(value: SetStateAction<string | undefined>) => {
              setLoaderType(value)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose loader type"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>File Loader</SelectLabel>
                <SelectItem value="PDF">PDF</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {loaderType === 'PDF' && (
            <Input
              type="file"
              accept="application/pdf"
              placeholder="OpenAI API key"
              onChange={e => setFileIput(e.target.files?.[0])}
            />
          )}
          <DialogFooter className="items-center">
            <Button
              disabled={!fileIput || embedingLoading}
              onClick={async () => {
                const formdata = new FormData()
                formdata.append('file', fileIput!)
                setEmbedingLoading(true)
                try {
                  await fetcher(`/api/data`, {
                    method: 'POST',
                    body: formdata
                  })
                } catch (error) {
                  console.error(error)
                }
                setEmbedingLoading(false)
                setFileDialog(false)
              }}
            >
              {embedingLoading ? 'Loading' : 'Embedding'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
