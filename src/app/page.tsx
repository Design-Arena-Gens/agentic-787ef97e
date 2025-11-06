import {
  ArrowTrendingUpIcon,
  SignalIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";
import { Section } from "@/components/ui/Section";
import { SupportTickets } from "@/components/SupportTickets";
import { EndpointOverview } from "@/components/EndpointOverview";
import { VulnerabilityPanel } from "@/components/VulnerabilityPanel";
import { AutomationCenter } from "@/components/AutomationCenter";
import { IntegrationPanel } from "@/components/IntegrationPanel";
import { AssistantConsole } from "@/components/AssistantConsole";
import { KnowledgeBase } from "@/components/KnowledgeBase";

const highlights = [
  {
    icon: ShieldCheckIcon,
    label: "Vulnerability Governance",
    value: "152",
    descriptor: "vulnerabilities triaged in the last 30 days"
  },
  {
    icon: WrenchScrewdriverIcon,
    label: "Auto-Remediation",
    value: "68%",
    descriptor: "of Level 1 incidents resolved without human touch"
  },
  {
    icon: SignalIcon,
    label: "Endpoint Visibility",
    value: "4.8k",
    descriptor: "assets reporting telemetry across Windows, macOS & network"
  },
  {
    icon: ArrowTrendingUpIcon,
    label: "SLA Compliance",
    value: "98.2%",
    descriptor: "response adherence across ITSM platforms"
  }
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.28),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(244,114,182,0.25),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <div className="glass border border-brand-500/20 bg-slate-950/60 p-8 md:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-100">
                Unified IT Operations Nerve Center
              </div>
              <h1 className="mt-6 text-4xl font-semibold text-slate-50 md:text-5xl">
                AI-Powered Vulnerability Management & Technical Support Assistant
              </h1>
              <p className="mt-4 text-base text-slate-300 md:text-lg">
                Command a hyper-intelligent operations cockpit combining Level 1 & Level 2
                IT support, proactive vulnerability detection, and cross-platform ticket
                synchronization for ServiceNow, Jira, and Freshservice.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase text-slate-300">
                <span className="pill">SLA Automation</span>
                <span className="pill">Zero Touch Lifecycle</span>
                <span className="pill">Endpoint Telemetry</span>
                <span className="pill">Security Alignment</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-5"
                >
                  <item.icon className="h-6 w-6 text-brand-300" />
                  <p className="mt-3 text-xs uppercase text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-slate-50">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{item.descriptor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-10">
          <Section
            title="Support Operations"
            description="Live queue intelligence across L1 and L2 with SLA risk tracking, escalation pathways, and omnichannel telemetry."
          >
            <SupportTickets />
          </Section>

          <Section
            title="Endpoint & Fleet Health"
            description="Unified view into compliance posture for Windows, macOS, and network devices, with prioritized remediation targets."
          >
            <EndpointOverview />
          </Section>

          <Section
            title="Vulnerability Intelligence"
            description="Prioritized CVE intake, risk scoring, and automation hooks for network, server, and workstation exposure."
          >
            <VulnerabilityPanel />
          </Section>

          <Section
            title="Lifecycle Automation Control"
            description="Execute guided onboarding/offboarding and remediation playbooks with audit-ready guardrails."
          >
            <AutomationCenter />
          </Section>

          <Section
            title="ITSM Integrations"
            description="Real-time bi-directional synchronization status across ServiceNow, Jira Service Management, and Freshservice."
          >
            <IntegrationPanel />
          </Section>

          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <Section
              title="AI Assistant Console"
              description="Collaborate with the VulnOps copilot to triage tickets, run diagnostics, and synchronize incident logs."
            >
              <div className="h-[480px]">
                <AssistantConsole />
              </div>
            </Section>
            <Section
              title="Runbook Library"
              description="Context-aware playbooks surfaced for current incident patterns."
            >
              <KnowledgeBase />
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
