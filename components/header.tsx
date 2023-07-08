import * as React from 'react'
import { ThemeToggle } from './theme-toggle'
export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <span>Chat</span>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </header>
  )
}
