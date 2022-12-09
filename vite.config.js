import { defineConfig } from 'vite'
// import { resolve } from 'path'
// import MonacoEditorNlsPlugin, {
//     esbuildPluginMonacoEditorNls,
// } from 'vite-plugin-monaco-editor-nls';
// import Inspect from 'vite-plugin-inspect';

// const zh_CN = require('vscode-loc.git/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json')

export default defineConfig({
    base: '/lottie-test/',
    // resolve: {
    //     alias: {
    //         '@': resolve('./src'),
    //     },
    // },
    // build: {
    //     sourcemap: true,
    // },
    // optimizeDeps: {
    //     /** vite 版本需要大于等于2.3.0 */
    //     esbuildOptions: {
    //         plugins: [
    //             esbuildPluginMonacoEditorNls(),
    //         ],
    //     },
    // },
    // plugins: [
    //     Inspect(),
    //     MonacoEditorNlsPlugin(),
    // ],
})
