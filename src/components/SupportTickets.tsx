"use client";

import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";
import { SparklesIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useMemo, useState } from "react";
import type { SupportTicket } from "@/data/mock";
import { supportTickets } from "@/data/mock";

const priorityColor: Record<SupportTicket["priority"], string> = {
  low: "bg-slate-800 text-slate-300",
  medium: "bg-amber-500/10 text-amber-300",
  high: "bg-orange-500/15 text-orange-300",
  critical: "bg-rose-500/15 text-rose-300"
};

const statusLabel: Record<SupportTicket["status"], string> = {
  new: "New",
  in_progress: "In Progress",
  waiting: "Waiting",
  resolved: "Resolved"
};

export function SupportTickets() {
  const [filter, setFilter] = useState<SupportTicket["assignedTeam"] | "ALL">(
    "ALL"
  );

  const filteredTickets = useMemo(() => {
    if (filter === "ALL") {
      return supportTickets;
    }
    return supportTickets.filter((ticket) => ticket.assignedTeam === filter);
  }, [filter]);

  const slaBreaches = useMemo(
    () =>
      supportTickets.filter(
        (ticket) => ticket.slaMinutesRemaining <= 15 && ticket.status !== "resolved"
      ).length,
    []
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="glass border border-slate-800/60 p-4">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Active Tickets
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-50">
            {supportTickets.length}
          </p>
          <p className="mt-3 text-xs text-slate-400">
            {supportTickets.filter((ticket) => ticket.status === "in_progress").length}{" "}
            engaged,{" "}
            {
              supportTickets.filter(
                (ticket) => ticket.status === "new" || ticket.status === "waiting"
              ).length
            }{" "}
            queued
          </p>
        </div>
        <div className="glass border border-slate-800/60 p-4">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            SLA Risk
          </p>
          <div className="mt-2 flex items-center gap-2">
            <ClockIcon className="h-7 w-7 text-amber-300" />
            <p className="text-3xl font-semibold text-slate-50">{slaBreaches}</p>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Tickets under 15 minutes remaining on SLA commit
          </p>
        </div>
        <div className="glass border border-slate-800/60 p-4">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Automation Boost
          </p>
          <div className="mt-2 flex items-center gap-2">
            <SparklesIcon className="h-7 w-7 text-emerald-300" />
            <p className="text-3xl font-semibold text-slate-50">43%</p>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Incidents resolved through auto-remediation in the last 7 days
          </p>
        </div>
        <div className="glass border border-slate-800/60 p-4">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Escalations
          </p>
          <div className="mt-2 flex items-center gap-2">
            <ArrowPathRoundedSquareIcon className="h-7 w-7 text-cyan-300" />
            <p className="text-3xl font-semibold text-slate-50">7</p>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Tickets escalated to higher tiers over the past 48 hours
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {["ALL", "L1", "L2", "Network", "Security"].map((team) => (
          <button
            key={team}
            onClick={() => setFilter(team as SupportTicket["assignedTeam"] | "ALL")}
            className={clsx(
              "rounded-full border px-3 py-1 text-xs font-semibold transition hover:border-brand-400 hover:text-brand-200",
              filter === team
                ? "border-brand-400 bg-brand-500/20 text-brand-100"
                : "border-slate-700 bg-slate-900/60 text-slate-300"
            )}
          >
            {team === "ALL" ? "All Queues" : `${team} Queue`}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800/70">
        <table className="min-w-full divide-y divide-slate-800/70 text-sm">
          <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-3">Ticket</th>
              <th className="px-6 py-3">Requester</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">SLA</th>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Assigned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 bg-slate-950/80 text-slate-200">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-slate-900/60">
                <td className="px-6 py-4 align-top">
                  <div className="font-semibold text-slate-100">{ticket.subject}</div>
                  <p className="mt-1 text-xs text-slate-400">{ticket.summary}</p>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="font-medium">{ticket.requester}</div>
                  <p className="mt-1 text-xs text-slate-500">
                    Created {new Date(ticket.createdAt).toLocaleTimeString()}
                  </p>
                </td>
                <td className="px-6 py-4 align-top">
                  <span
                    className={clsx(
                      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                      priorityColor[ticket.priority]
                    )}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 align-top">
                  <span
                    className={clsx(
                      "inline-flex items-center gap-1 rounded-full bg-slate-800/70 px-2.5 py-1 text-xs font-semibold capitalize",
                      {
                        "text-emerald-300": ticket.status === "resolved",
                        "text-amber-300": ticket.status === "waiting",
                        "text-sky-300": ticket.status === "in_progress",
                        "text-slate-300": ticket.status === "new"
                      }
                    )}
                  >
                    {ticket.status === "resolved" ? (
                      <CheckCircleIcon className="h-4 w-4" />
                    ) : ticket.status === "waiting" ? (
                      <ClockIcon className="h-4 w-4" />
                    ) : ticket.status === "in_progress" ? (
                      <PhoneIcon className="h-4 w-4" />
                    ) : (
                      <ExclamationTriangleIcon className="h-4 w-4" />
                    )}
                    {statusLabel[ticket.status]}
                  </span>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="font-semibold text-slate-100">
                    {ticket.slaMinutesRemaining}m
                  </div>
                  <p className="mt-1 text-xs text-slate-500">remaining</p>
                </td>
                <td className="px-6 py-4 align-top capitalize">{ticket.channel}</td>
                <td className="px-6 py-4 align-top">
                  <span className="rounded-full border border-brand-400/40 bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-200">
                    {ticket.assignedTeam}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
