import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function copyShareAssets() {
  return {
    name: 'copy-share-assets',
    closeBundle() {
      const source = resolve(__dirname, 'share')
      const target = resolve(__dirname, 'dist/share')

      if (existsSync(source)) {
        cpSync(source, target, { recursive: true })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copyShareAssets()],
  server: {
    port: 5173,
    open: true
  }
})
