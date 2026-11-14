import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Enforce Vercel preset for Nitro so it automatically produces .vercel/output
process.env.NITRO_PRESET = process.env.NITRO_PRESET || "vercel";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
