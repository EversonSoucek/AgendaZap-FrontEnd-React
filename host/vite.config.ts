import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        clinic: "http://localhost:5001/assets/remoteEntry.js"
      },
      shared: {
        react: {
          requiredVersion: "^18.2.0",
          singleton: true
        } as any,
        "react-dom": {
          requiredVersion: "^18.2.0",
          singleton: true
        } as any,
        "@mui/material": { singleton: true } as any,
        "@emotion/react": { singleton: true } as any,
        "@emotion/styled": { singleton: true } as any,
      }
    }),
  ],
  server: {
    port: 3000,
    hmr: true,
  },
  build: {
    target: "esnext",
  },
});
