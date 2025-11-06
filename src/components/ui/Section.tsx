import { ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  action,
  children,
  className
}: SectionProps) {
  return (
    <section className={clsx("glass p-6 lg:p-8", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <p className="section-title">{title}</p>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
