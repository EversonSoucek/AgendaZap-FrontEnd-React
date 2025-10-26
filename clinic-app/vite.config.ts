import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "clinic",
      filename: "remoteEntry.js",
      exposes: {
        "./FuncionarioForm": "./src/components/Forms/UsuarioForm/FuncionarioForm.tsx",
        "./Cabecalho": "./src/components/Cabecalho/Cabecalho.tsx"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.2.0",
        } as any,
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.2.0",
        } as any,
        "@mui/material": {
          singleton: true,
          requiredVersion: "^5.14.0",
        } as any,
        "@emotion/react": { singleton: true } as any,
        "@emotion/styled": { singleton: true } as any,
      }

    }),
  ],
  server: {
    port: 5001,
    strictPort: true, // garante que não muda a porta
  },
  build: {
    target: "esnext",
    minify: false, // facilita debug no dev
    cssCodeSplit: true,
  },
});
