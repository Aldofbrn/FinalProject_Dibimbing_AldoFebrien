import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define process globally to avoid errors like `process is not defined`
    'process.env': {},
  },
});
