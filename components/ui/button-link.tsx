import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  solid: "bg-shade text-ink hover:bg-shade-bright active:scale-[0.98]",
  outline: "border border-cusp/30 text-ink hover:bg-cusp/5 active:scale-[0.98]",
  ghost: "text-porcelain hover:text-shade-bright",
};

export function ButtonLink({ href, children, variant = "solid", className }: ButtonLinkProps) {
  const isExternal = href.startsWith("http");
  const props = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
