export class SandboxGlobalProxy {
    constructor(sharedState) {
        // 创建一个 iframe 标签，取出其中的原生浏览器全局对象作为沙箱的全局对象
        const iframe = document.createElement("iframe", { url: "about:blank" });
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        // sandboxGlobal作为沙箱运行时的全局对象
        const sandboxGlobal = iframe.contentWindow;

        return new Proxy(sandboxGlobal, {
            has: (target, prop) => {
                // has 可以拦截 with 代码块中任意属性的访问
                if (sharedState.includes(prop)) {
                    // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
                    return new Error('xx');
                }

                // 如果没有该属性，直接报错
                if (!target.hasOwnProperty(prop)) {
                    throw new Error(`Not find: ${prop}!`);
                }

                // 属性存在，返回sandboxGlobal中的值
                return true;
            },
            get: (target, prop, receiver) => {
                if (sharedState.includes(prop)) {
                    // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
                    return undefined;
                }

                return Reflect.get(target, prop);
                // return target[prop];
            },
        });
    }

}
function withedYourCode(code) {
    code = `
    with(sandbox) {
        ${code}
    }
    `;
    // function xx(sandbox) { with(sandbox) { ...code } }
    return new Function("sandbox", code);
}
export function maybeAvailableSandbox(code, ctx) {
    // ( function xx(sandbox) { with(sandbox) { ...code } } ).call(ctx, ctx);
    withedYourCode(code).call(ctx, ctx);
}