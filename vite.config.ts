import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(async ({ mode }) => {
  // Dynamically import componentTagger only in development mode
  const componentTagger = mode === "development" ? (await import("lovable-tagger")).componentTagger : null;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), componentTagger && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
