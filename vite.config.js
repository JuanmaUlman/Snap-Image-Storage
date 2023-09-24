import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv"; // Agrega esta líne

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
