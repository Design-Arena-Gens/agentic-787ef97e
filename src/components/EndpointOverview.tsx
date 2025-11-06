"use client";

import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  SignalIcon
} from "@heroicons/react/24/solid";
import { endpointHealth } from "@/data/mock";

const platformIcon: Record<string, JSX.Element> = {
  Windows: <ComputerDesktopIcon className="h-5 w-5 text-sky-300" />,
  macOS: <ComputerDesktopIcon className="h-5 w-5 text-emerald-300" />,
  iOS: <DevicePhoneMobileIcon className="h-5 w-5 text-rose-300" />,
  Android: <DevicePhoneMobileIcon className="h-5 w-5 text-amber-300" />,
  Network: <SignalIcon className="h-5 w-5 text-purple-300" />
};

const patchLabel: Record<string, string> = {
  up_to_date: "Up to Date",
  pending: "Patch Pending",
  overdue: "Overdue"
};

export function EndpointOverview() {
  const fleetScore =
    endpointHealth.reduce((acc, device) => acc + device.complianceScore, 0) /
    endpointHealth.length;

  const riskyDevices = endpointHealth.filter(
    (device) => device.patchLevel === "overdue"
  );

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {endpointHealth.map((endpoint) => (
          <div
            key={endpoint.deviceId}
            className="glass flex flex-col gap-3 border border-slate-800/70 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-slate-800/80 p-3">
                {platformIcon[endpoint.platform] ?? (
                  <ServerStackIcon className="h-5 w-5 text-slate-200" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="pill">{endpoint.deviceId}</span>
                  <span className="pill">{endpoint.platform}</span>
                  <span className="pill">{endpoint.location}</span>
                </div>
                <p className="mt-3 text-base font-semibold text-slate-100">
                  {endpoint.user}
                </p>
                <ul className="mt-2 space-y-1 text-xs text-slate-400">
                  {endpoint.issues.map((issue) => (
                    <li key={issue}>• {issue}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs uppercase text-slate-400">Compliance</p>
                <p className="mt-1 text-2xl font-semibold text-slate-50">
                  {endpoint.complianceScore}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase text-slate-400">Patch Status</p>
                <p className="mt-1 font-semibold text-slate-200">
                  {patchLabel[endpoint.patchLevel]}
                </p>
                <p className="text-xs text-slate-500">
                  Last seen {new Date(endpoint.lastSeen).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="glass border border-slate-800/60 p-5">
          <p className="text-xs uppercase text-slate-400">Fleet Health</p>
          <p className="mt-2 text-4xl font-semibold text-slate-50">
            {fleetScore.toFixed(0)}%
          </p>
          <p className="mt-3 text-xs text-slate-400">
            Weighted compliance score across managed endpoints. Target ≥ 92%.
          </p>
          <div className="mt-4 h-2 rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-brand-500"
              style={{ width: `${fleetScore}%` }}
            />
          </div>
        </div>
        <div className="glass border border-rose-500/30 bg-rose-500/5 p-5">
          <p className="text-xs uppercase text-rose-300">High Risk Targets</p>
          <p className="mt-2 text-3xl font-semibold text-rose-100">
            {riskyDevices.length}
          </p>
          <p className="mt-3 text-xs text-rose-200">
            Devices with overdue patch levels requiring escalation to Level 2 or
            Security operations.
          </p>
          <ul className="mt-4 space-y-2 text-xs text-rose-100">
            {riskyDevices.map((device) => (
              <li key={device.deviceId} className="flex justify-between">
                <span>
                  {device.deviceId} — {device.platform}
                </span>
                <span>{device.location}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
