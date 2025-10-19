const btn = document.querySelector(".btn-alg");
const body = document.querySelector("body");
const startBtn = document.querySelector(".start-btn");
const s = 1000

// inicializa texto do botão se estiver vazio
if (!btn.textContent.trim()) {
    btn.textContent = 'On';
}

btn.addEventListener("click", () => {
    body.classList.toggle('no-before');
    const hidden = body.classList.contains('no-before');
    btn.textContent = hidden ? 'Off' : 'On';
});

startBtn.addEventListener("click", () => {
    setTimeout(() => {
        window.location.href = 'mapinha/index.html';
    }, 1 * s);
});