import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: './', // Ensures assets load correctly on GitHub Pages
    build: {
      outDir: 'dist',
    },
    define: {
      // Robustly polyfill process.env to avoid "process is not defined" errors
      'process.env': JSON.stringify({
        API_KEY: env.API_KEY,
        NODE_ENV: mode
      }),
      // Also define global 'process' as an empty object just in case a library accesses it directly
      'process': {}
    }
  }
})