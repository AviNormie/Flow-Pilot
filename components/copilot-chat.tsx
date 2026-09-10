"use client"

import { useState } from "react"
import { Bot, ChevronDown, ExternalLink, MessageCircle, X } from "lucide-react"

const copilotAgentUrl = process.env.NEXT_PUBLIC_COPILOT_AGENT_URL

export default function CopilotChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {isOpen && (
        <section
          aria-label="FlowCopilot chat"
          className="flex h-[min(680px,calc(100vh-120px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[#E0DEDB] bg-[#F7F5F3] shadow-[0_20px_60px_rgba(55,50,47,0.18)]"
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

          <div className="min-h-0 flex-1 bg-white">
            {copilotAgentUrl ? (
              <iframe
                title="FlowCopilot Studio agent"
                src={copilotAgentUrl}
                className="h-full w-full border-0"
                allow="microphone"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center text-[#605A57]">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#F7F5F3] text-[#37322F]">
                  <MessageCircle className="size-5" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-[#37322F]">Copilot is almost ready</p>
                  <p className="text-sm leading-6">
                    Add your published Copilot Studio embed URL to <code className="rounded bg-[#F7F5F3] px-1.5 py-0.5 text-xs">NEXT_PUBLIC_COPILOT_AGENT_URL</code> to connect the assistant.
                  </p>
                </div>
                <a
                  href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-add-bot-to-web-sites"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#37322F] underline underline-offset-4"
                >
                  Open Copilot Studio guide
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
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
