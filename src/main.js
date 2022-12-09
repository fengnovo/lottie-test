import lottie from 'lottie-web';
import a1 from './public/loading.json';
import a2 from './public/data.json';
import a3 from './public/404.json';
import './style.css';


import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'

import { SandboxGlobalProxy, maybeAvailableSandbox } from './iFrameProxy';

const idFlow = document.getElementById('id-flow');
const id404 = document.getElementById('id404');
const idLoading = document.getElementById('id-loading');
lottie.loadAnimation({
    container: idLoading,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: a1,
});
lottie.loadAnimation({
    container: idFlow,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: a2,
});
lottie.loadAnimation({
    container: id404,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: a3,
});

const compileTS = async (uri) => {
    // 读取编译子线程
    const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await tsWorker(uri);
    const result = await client.getEmitOutput(uri.toString());
    const files = result.outputFiles[0];
    return files.text;
};

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (['css', 'scss', 'less'].includes(label)) {
            return new cssWorker()
        }
        if (['html', 'handlebars', 'razor'].includes(label)) {
            return new htmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
            return new tsWorker()
        }
        return new EditorWorker()
    },
}
let editor;
const init = () => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
    })
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
    })

    editor = monaco.editor.create(document.getElementById('codeEditBox'), {
        value: "window.fetch('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312').then(res => res.json()).then(data => console.log(data))",//编辑器初始显示文字
        language: 'typescript',//语言支持自行查阅
        theme: 'vs-dark',//官方自带三种主题vs, hc-black, or vs-dark
        demoautomaticLayout: true,//自动布局
    })

    // 监听值的变化
    editor.onDidChangeModelContent(() => {
        const value = editor.getValue() //给父组件实时返回最新文本
    })
}
init();
async function runCode() {
    const tsJs = await compileTS(editor.getModel('typescript').uri);
    const sharedGlobal = ['history'];
    const globalProxy = new SandboxGlobalProxy(sharedGlobal);
    maybeAvailableSandbox(tsJs, globalProxy);
}

document.getElementById('run').addEventListener('click', async () => {
    await runCode()
})