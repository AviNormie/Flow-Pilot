"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is FlowCopilot and who is it for?",
    answer:
      "FlowCopilot is an AI-powered platform for building, deploying, and managing Copilot agents and automated workflows. It's built for product teams, operations teams, and enterprises that want to automate repetitive processes and give their teams an AI co-worker.",
  },
  {
    question: "What can a Copilot agent actually do?",
    answer:
      "Your agents can answer questions, trigger multi-step workflows, look up data across your connected tools, draft content, route tasks, send notifications, and take action on behalf of your team — all from a natural language interface.",
  },
  {
    question: "How do I connect FlowCopilot to my existing tools?",
    answer:
      "FlowCopilot connects out of the box with Slack, Microsoft Teams, GitHub, Jira, Notion, Salesforce, and hundreds more via our native integrations and open API. Most teams are fully connected in under an hour.",
  },
  {
    question: "Do I need coding experience to build an agent?",
    answer:
      "No. Our visual workflow builder lets anyone create and deploy agents without writing code. For advanced use cases, developers can extend agents with custom actions, webhooks, and API integrations.",
  },
  {
    question: "How is my data kept secure?",
    answer:
      "We use enterprise-grade security throughout — end-to-end encryption in transit and at rest, SOC 2 Type II compliance, role-based access controls, and full audit logs. Your data is never used to train models.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "You can have your first Copilot agent live in minutes. Sign up, pick a template or describe your workflow, connect your tools, and deploy. Our onboarding team is available to help you go further.",
  },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        {/* Left Column - Header */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-[#49423D] font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            Frequently Asked Questions
          </div>
          <div className="w-full text-[#605A57] text-base font-normal leading-7 font-sans">
            Everything you need to know about building agents
            <br className="hidden md:block" />
            and automating your workflows with FlowCopilot.
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div key={index} className="w-full border-b border-[rgba(73,66,61,0.16)] overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[rgba(73,66,61,0.02)] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-[#49423D] text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronDownIcon
                        className={`w-6 h-6 text-[rgba(73,66,61,0.60)] transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-[#605A57] text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
