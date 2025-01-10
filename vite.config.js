import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "public",
  plugins: [],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: false,
  },
  lib: {
    entry: resolve(__dirname, "app.js"),
    name: "MyLib",
    // the proper extensions will be added
    fileName: "my-lib",
  },
});
