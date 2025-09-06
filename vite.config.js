import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            outDir: 'dist/types',
            copyDtsFiles: true
        })
    ],
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'SendeliusUI',
            fileName: (format) => `sendelius-ui.${format}.js`
        },
        rollupOptions: {
            external: ['vue', 'pinia'],
            output: {
                globals: {
                    vue: 'Vue',
                    pinia: 'Pinia'
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
