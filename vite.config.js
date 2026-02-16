import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   base: "/aswin-portfolio/", 
  plugins: [react()],
  server: {
    open: true
  }
})
