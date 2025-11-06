"use client";

import { BoltIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { playbooks } from "@/data/mock";

const onboardingSteps = [
  {
    id: "account",
    title: "Account Provisioning",
    description: "Create AD/Okta accounts and assign baseline security groups."
  },
  {
    id: "productivity",
    title: "Productivity Apps",
    description: "Assign Microsoft 365, Slack Enterprise Grid, and Confluence."
  },
  {
    id: "hardware",
    title: "Hardware Logistics",
    description: "Reserve workstation, confirm shipment, track asset custody."
  },
  {
    id: "compliance",
    title: "Compliance Checklist",
    description: "Enable MFA, enroll in MDM, validate encryption policies."
  }
];

export function AutomationCenter() {
  const [selectedStep, setSelectedStep] = useState(onboardingSteps[0].id);
  const [mode, setMode] = useState<"onboarding" | "offboarding">("onboarding");

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <div className="glass space-y-4 border border-slate-800/70 p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase text-slate-400">Lifecycle Control</p>
          <div className="flex gap-2 rounded-full bg-slate-900/80 p-1">
            <button
              onClick={() => setMode("onboarding")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                mode === "onboarding"
                  ? "bg-brand-500/20 text-brand-100"
                  : "text-slate-300"
              }`}
            >
              Onboard
            </button>
            <button
              onClick={() => setMode("offboarding")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                mode === "offboarding"
                  ? "bg-rose-500/20 text-rose-100"
                  : "text-slate-300"
              }`}
            >
              Offboard
            </button>
          </div>
        </div>
        <p className="text-sm text-slate-300">
          Orchestrate zero-touch lifecycle automation with pre-approved guardrails.
          Integrates directly into ServiceNow HRSD and Workday events.
        </p>
        <ul className="space-y-3">
          {onboardingSteps.map((step) => (
            <li key={step.id}>
              <button
                onClick={() => setSelectedStep(step.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  selectedStep === step.id
                    ? "border-brand-400/50 bg-brand-500/10 text-brand-100"
                    : "border-slate-800/60 bg-slate-900/70 text-slate-200 hover:border-slate-700"
                }`}
              >
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="mt-1 text-xs text-slate-400">{step.description}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass border border-slate-800/70 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div>
            <p className="section-title">
              {mode === "onboarding" ? "Zero Touch Onboarding" : "Secure Offboarding"}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Execute governed automation sequences with live telemetry, audit trails,
              and ITSM ticket synchronization.
            </p>
          </div>
          <div className="rounded-full border border-brand-400/50 bg-brand-500/20 px-4 py-2 text-xs font-semibold text-brand-100">
            <span className="mr-2 inline-flex items-center justify-center rounded-full bg-brand-500/50 p-1">
              <BoltIcon className="h-4 w-4" />
            </span>
            {mode === "onboarding" ? "Provisioning Ready" : "Revocation Armed"}
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {playbooks.map((playbook) => (
            <div
              key={playbook.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4"
            >
              <p className="text-xs uppercase text-slate-400">{playbook.id}</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">
                {playbook.name}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Trigger: <span className="text-slate-200">{playbook.trigger}</span>
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-300">
                {playbook.actions.map((action) => (
                  <li key={action}>→ {action}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Owner: {playbook.owner}</span>
                <span>Success {Math.round(playbook.successRate * 100)}%</span>
              </div>
              <div className="mt-2 text-right text-[11px] text-slate-500">
                Last run {new Date(playbook.lastRun).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-xs text-emerald-100">
            <p className="text-sm font-semibold text-emerald-50">
              Compliance Guardrails
            </p>
            <ul className="mt-2 space-y-1">
              <li>• SOX controls auto-validated in ServiceNow change tasks.</li>
              <li>• MFA enforced across Okta, Azure AD, and VPN gateways.</li>
              <li>• Endpoint encryption verified before account activation.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-4 text-xs text-rose-100">
            <p className="text-sm font-semibold text-rose-50">Escalation Rules</p>
            <ul className="mt-2 space-y-1">
              <li>• SLA breach triggers ServiceNow Major Incident workflow.</li>
              <li>• Two failed automation attempts auto-assign to Level 2.</li>
              <li>• Security-sensitive steps require dual approval in Jira.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
