import * as React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "z-50 bg-background border-t border-muted")}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col items-start gap-4 md:flex-col">
          <div className="w-full pb-3 pt-8 text-sm text-foreground/90">
            <div className="inline-flex items-center gap-1.5 pr-1.5">
              Developed with 💙 by
            </div>
            <Link
              href="https://harjot.co"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Harjot Singh Rana
            </Link>.{" "}
            The source code is available on{" "}
            <Link
              href="https://github.com/HarjjotSinghh/document-form-builder"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}