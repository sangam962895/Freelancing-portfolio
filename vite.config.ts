import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset URLs relative, so the build works on GitHub Pages
// whether the site lives at the root or under /<repo-name>/.
export default defineConfig({
  plugins: [react()],
  base: './',
});
