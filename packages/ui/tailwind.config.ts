import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "presets" | "content"> = {
  content: ["./components/**/*.{ts,tsx}"],
  presets: [sharedConfig],
};

export default config;
