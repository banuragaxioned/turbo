"use client";

import { Toaster } from "@repo/ui/sonner";
import { TooltipProvider } from "@repo/ui/tooltip";
import { TailwindIndicator } from "./tailwind-indicator";
import { ThemeProvider } from "./theme-provider";

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster richColors />
      </ThemeProvider>
      <TailwindIndicator />
    </>
  );
}
