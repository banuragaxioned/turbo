"use client";

import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/cn";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/tooltip";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    }
    if (theme === "dark") {
      setTheme("light");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("mt-auto rounded-lg", className)}
          onClick={handleToggle}
          aria-label="Account"
        >
          <SunMedium className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        Account
      </TooltipContent>
    </Tooltip>
  );
}
