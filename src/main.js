import lottie from "lottie-web";
import a1 from "./public/loading.json";
import a2 from "./public/data.json";
import a3 from "./public/404.json";

const idFlow = document.getElementById("id-flow");
const id404 = document.getElementById("id404");
const idLoading = document.getElementById("id-loading");
lottie.loadAnimation({
    container: idLoading,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: a1,
});
lottie.loadAnimation({
    container: idFlow,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: a2,
});
lottie.loadAnimation({
    container: id404,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: a3,
});
