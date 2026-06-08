import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',                  // El motor que mide la cobertura
      reporter: ['text', 'html'],      // Nos muestra una tabla en consola y nos crea el HTML visual
      thresholds: {
        statements: 80,                // ¡Aquí configuramos tu meta del 80%!
        branches: 80,
        functions: 80,
        lines: 80
      }
    }
  }
})