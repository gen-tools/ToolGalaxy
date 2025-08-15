import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Client-side build configuration
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: {
        main: "./client/entry-client.tsx"
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
