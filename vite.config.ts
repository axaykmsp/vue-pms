import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

const env = loadEnv(process.cwd(), "");
process.env = { ...process.env, ...env };
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  return {
    plugins: [vue()],
    resolve: {
      alias: [
      {
        find: '~bootstrap',
        replacement: path.resolve(__dirname, "node_modules/bootstrap"),
      },
      {
        find: '@/',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, '/src'),
      },
    ]
    },
    define: {
      // vitejs does not support process.env so we have to redefine it
      'process.env': process.env,
    },
    server: {
      port: 4200,
    },
  };
});
