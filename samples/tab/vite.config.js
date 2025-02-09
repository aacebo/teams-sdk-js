import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/tabs/test',
  mode: 'development',
  esbuild: {
    tsconfigRaw: fs.readFileSync('./tsconfig.app.json'),
  },
});
