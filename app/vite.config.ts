import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vuetify from 'vite-plugin-vuetify'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) =>{
  const isDev = mode === 'development'
  return {
    plugins: [
      vue(),
      vuetify({ 
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss'
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    ...(isDev && {
      server: {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-cert.pem')),
        },
        port: 5173,
        host: 'localhost',
        cors: true
      }
    })
  }
});
