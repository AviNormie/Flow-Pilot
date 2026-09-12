"use client"

import { useEffect, useState } from "react"
import { Bot, ChevronDown, Loader2, MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

const COPILOT_STUDIO_EMBED_URL =
  process.env.NEXT_PUBLIC_COPILOT_AGENT_URL ??
  "https://copilotstudio.microsoft.com/environments/cfbc5995-f457-e2c3-8bbb-709c3ed346bc/bots/cr8eb_enterpriseknowledgeagent_xegleB/webchat?__version__=2&enableFileAttachment=false&cliAgent=true"

export default function CopilotChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isSlow, setIsSlow] = useState(false)

  useEffect(() => {
    const warmup = window.setTimeout(() => setIsMounted(true), 400)
    return () => window.clearTimeout(warmup)
  }, [])

  useEffect(() => {
    if (!isMounted || isReady) return
    const slow = window.setTimeout(() => setIsSlow(true), 10000)
    return () => window.clearTimeout(slow)
  }, [isMounted, isReady])

  const toggleOpen = () => {
    setIsMounted(true)
    setIsOpen((open) => !open)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-7 sm:right-7">
      <section
        aria-hidden={!isOpen}
        aria-label="FlowCopilot chat"
        className={cn(
          "absolute bottom-full right-0 mb-3 flex h-[min(680px,calc(100vh-120px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[#E0DEDB] bg-[#F7F5F3] shadow-[0_20px_60px_rgba(55,50,47,0.18)]",
          isOpen ? "visible" : "invisible pointer-events-none"
        )}
      >
        <header className="flex items-center justify-between border-b border-[#E0DEDB] bg-[#37322F] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/10">
              <Bot className="size-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold">FlowCopilot Assistant</p>
              <p className="text-xs text-white/65">Ask me anything about your workflows</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close Copilot chat"
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </header>

        <div className="relative min-h-0 flex-1 bg-white">
          {isMounted && (
            <iframe
              title="FlowCopilot Studio agent"
              src={COPILOT_STUDIO_EMBED_URL}
              className="absolute inset-0 h-full w-full border-0"
              allow="microphone; clipboard-write"
              loading="eager"
              onLoad={() => setIsReady(true)}
            />
          )}

          {!isReady && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white px-8 text-center">
              <Loader2 className="size-6 animate-spin text-[#37322F]" aria-hidden="true" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#37322F]">Connecting to Copilot</p>
                <p className="text-xs leading-5 text-[#605A57]">
                  {isSlow
                    ? "Microsoft is still starting the agent. This first load can take a bit."
                    : "Starting the agent. This only takes a moment the first time."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Minimize Copilot chat" : "Open Copilot chat"}
        className="group flex items-center gap-2 rounded-full bg-[#37322F] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(55,50,47,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#49423D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#37322F] focus-visible:ring-offset-2"
      >
        {isOpen ? <ChevronDown className="size-4" aria-hidden="true" /> : <MessageCircle className="size-4" aria-hidden="true" />}
        <span>{isOpen ? "Minimize" : "Chat with Copilot"}</span>
      </button>
    </div>
  )
}
