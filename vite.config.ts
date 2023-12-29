import { defineConfig, resolveBaseUrl } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Components({
        resolvers: [
            AntDesignVueResolver({
                importStyle: false, // css in js
            }),
        ],
    }),],
    server: {
        host: "0.0.0.0",
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
