import lottie from "lottie-web"
import a1 from './loading.json'
import a2 from './data.json'
import a3 from './404.json'

// const a1 = new URL('./src/loading.json', import.meta.url).href
// const a2 = new URL('./src/data.json', import.meta.url).href
// const a3 = new URL('./src/404.json', import.meta.url).href


const idFlow = document.getElementById('id-flow')
const id404 = document.getElementById('id404')
const idLoading = document.getElementById('id-loading')
lottie.loadAnimation({
    container: idLoading,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    // path: 'src/loading.json'
    animationData: a1
    // animationData: new URL('./src/loading.json', import.meta.url).href,
});
lottie.loadAnimation({
    container: idFlow,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    // path: 'src/data.json'
    animationData: a2
    // animationData: new URL('./src/data.json', import.meta.url).href,
});
lottie.loadAnimation({
    container: id404,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    // path: 'src/404.json'
    animationData: a3
    // animationData: new URL('./src/404.json', import.meta.url).href,
});