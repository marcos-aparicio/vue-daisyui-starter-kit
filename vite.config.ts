import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        vue(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./resources/js"),
            "ziggy-js": resolve(__dirname, "vendor/tightenco/ziggy"),
        },
    },
});
