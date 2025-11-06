"use client";

import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  CloudIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { integrations } from "@/data/mock";

const statusColor: Record<string, string> = {
  operational: "text-emerald-300",
  degraded: "text-amber-300",
  offline: "text-rose-300"
};

export function IntegrationPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {integrations.map((integration) => (
        <div
          key={integration.name}
          className="glass border border-slate-800/70 p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase text-slate-400">Integration</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">
                {integration.name}
              </p>
            </div>
            <CloudIcon className="h-6 w-6 text-slate-500" />
          </div>
          <p className="mt-2 text-xs text-slate-400">{integration.platformUrl}</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className={clsx("font-semibold capitalize", statusColor[integration.health])}>
              {integration.health}
            </span>
            <span className="rounded-full bg-slate-900/80 px-2 py-1 text-slate-400">
              {integration.syncedItemsToday} syncs today
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-300">{integration.notes}</p>
          <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
            <span>Last sync {new Date(integration.lastSync).toLocaleTimeString()}</span>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1 text-slate-200 transition hover:border-brand-400 hover:text-brand-100">
                <ArrowPathIcon className="h-4 w-4" />
                Resync
              </button>
              <a
                href={integration.platformUrl}
                className="inline-flex items-center gap-1 text-slate-400 transition hover:text-brand-200"
              >
                Console <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
