import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
require("dotenv").config({ path: "./key.env" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
