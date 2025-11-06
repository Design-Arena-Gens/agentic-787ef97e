"use client";

import { BookOpenIcon } from "@heroicons/react/24/outline";
import { knowledgeBase } from "@/data/mock";

export function KnowledgeBase() {
  return (
    <div className="glass border border-slate-800/70 p-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <BookOpenIcon className="h-6 w-6 text-brand-300" />
        <div>
          <p className="section-title">Operational Knowledge</p>
          <p className="mt-1 text-sm text-slate-300">
            Curated runbooks surfaced by AI assistant based on active incidents.
          </p>
        </div>
      </div>
      <ul className="mt-5 space-y-4">
        {knowledgeBase.map((article) => (
          <li
            key={article.kbId}
            className="flex items-start justify-between rounded-xl border border-slate-800/60 bg-slate-900/70 p-4"
          >
            <div>
              <p className="text-sm font-semibold text-slate-100">
                {article.title}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Platforms:{" "}
                <span className="text-slate-200">{article.platforms.join(", ")}</span>
              </p>
            </div>
            <div className="text-right text-xs">
              <p className="font-semibold text-slate-300">{article.kbId}</p>
              <p className="mt-1 text-slate-500">{article.estimatedTime}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
