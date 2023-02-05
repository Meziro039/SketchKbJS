console.log("main.js");

var TestInterval = setInterval(() => {
    setTimeout(() => {
        setTimeout(() => {
            document.getElementById("Hello").textContent = "こんにちは 世界";
        }, 500);
        document.getElementById("Hello").textContent = "Hello World";
    }, 500);
}, 1000);

function exit() {
    clearInterval(TestInterval);
}