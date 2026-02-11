import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: './', // Ensures assets load correctly on GitHub Pages
    build: {
      outDir: 'dist',
    },
    define: {
      // Prevents "ReferenceError: process is not defined" in browser
      'process.env': {
        API_KEY: JSON.stringify(env.API_KEY)
      }
    }
  }
})