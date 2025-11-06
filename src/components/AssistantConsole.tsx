"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface TranscriptEntry {
  role: "assistant" | "analyst";
  content: string;
  timestamp: string;
}

const seedTranscript: TranscriptEntry[] = [
  {
    role: "assistant",
    content:
      "Identified VPN disconnect patterns correlated with AnyConnect version 5.1.2. Recommend rolling back to 5.0.9 pending Cisco fix.",
    timestamp: "16:03"
  },
  {
    role: "analyst",
    content: "Push remediation to Avery Nolan device and monitor telemetry.",
    timestamp: "16:05"
  },
  {
    role: "assistant",
    content:
      "Remediation scheduled. Added ServiceNow work note and updated Jira incident with reference logs.",
    timestamp: "16:05"
  }
];

const responseTemplates = [
  "Confirmed. Executing playbook with validation checks enabled.",
  "Generated escalation package with timeline and diagnostic bundle.",
  "Remediation running. I'll post back once sensors report stability.",
  "Ticket synchronized across ServiceNow, Jira, and Freshservice.",
  "Queued vulnerability scan and updated asset inventory snapshot."
];

export function AssistantConsole() {
  const [transcript, setTranscript] = useState(seedTranscript);
  const [input, setInput] = useState("");

  const submit = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setTranscript((prev) => [
      ...prev,
      { role: "analyst", content: input.trim(), timestamp: time }
    ]);
    setInput("");
    const response =
      responseTemplates[Math.floor(Math.random() * responseTemplates.length)];
    setTimeout(() => {
      const updatedTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      setTranscript((prev) => [
        ...prev,
        { role: "assistant", content: response, timestamp: updatedTime }
      ]);
    }, 600);
  };

  return (
    <div className="glass flex h-full flex-col border border-slate-800/70">
      <div className="border-b border-slate-800/70 p-5">
        <p className="section-title">AI Support Co-pilot</p>
        <p className="mt-2 text-xs text-slate-300">
          Initiate troubleshooting workflows, escalate incidents, or request vulnerability
          analysis. Interactions recorded in ITSM logs.
        </p>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-5 text-sm">
        {transcript.map((entry, idx) => (
          <div
            key={`${entry.timestamp}-${idx}`}
            className={`flex ${entry.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-lg rounded-2xl border px-4 py-3 ${
                entry.role === "assistant"
                  ? "border-brand-400/40 bg-brand-500/10 text-brand-50"
                  : "border-slate-700 bg-slate-900/80 text-slate-100"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase text-slate-400">
                <span>{entry.role === "assistant" ? "VulnOps AI" : "Analyst"}</span>
                <span>{entry.timestamp}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{entry.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800/70 p-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="Instruct the assistant e.g. 'Escalate SEC-882 to Security Operations and sync notes to ServiceNow'"
          />
          <button
            onClick={submit}
            className="rounded-xl border border-brand-400/60 bg-brand-500/20 px-4 py-3 text-sm font-semibold text-brand-100 transition hover:bg-brand-500/30"
          >
            <span className="flex items-center gap-2">
              <PaperAirplaneIcon className="h-4 w-4" />
              Send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
