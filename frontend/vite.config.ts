import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({

  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test-setup/setupTests.ts", 'dotenv/config'],
    include: ["./src/__tests__/unit/vitest/**/*"]
  },
});
