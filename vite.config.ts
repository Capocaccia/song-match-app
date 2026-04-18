import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE to your GitHub Pages repo path, e.g. '/song-match-app/'
// If deploying to a custom domain root, set to '/'
const BASE = process.env.VITE_BASE_URL ?? '/song-match-app/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [react()],
})
