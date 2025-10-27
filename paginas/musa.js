const title = document.querySelector(".text");
// const video = document.querySelector(".m_video");

// video.controls = true;
// video.play();

let titleText = "Musa é a fada da música do planeta Melody. Desde pequena, sempre foi apaixonada por arte e som, inspirada por sua mãe, que também era musicista. Após perder a mãe, tornou-se mais reservada e determinada. É uma fada sensível, criativa e leal, que usa a música como forma de expressar emoções e canalizar sua magia. Musa representa a força da arte e dos sentimentos, mostrando que a música pode ser uma poderosa forma de magia e coragem.";
let titleArray = titleText.split('');
let index = 0;
let hasTyped = false;


/**
 * A função `typeWriter` digita cada caractere de um determinado titleArray com um atraso de 100 milissegundos entre cada caractere até que todo o título seja digitado.
 */
const typeWriter = () => {
    if (!title) return;
    if (index < titleArray.length && !hasTyped) {
        title.innerHTML += titleArray[index];
        index++;
        setTimeout(typeWriter, 50);
    }

    if (index === titleArray.length && !hasTyped) {
        hasTyped = true;
        // depois de terminar de digitar, esperar 2s e começar a apagar
        setTimeout(erasorWriter, 10000);
    }
}

/**
  * A função `erasorWriter` apaga caracteres do conteúdo de um elemento HTML até que ele fique vazio e, em seguida, invoca a função `typeWriter` após um atraso.
  * @returns Na função `erasorWriter`, nada é retornado explicitamente. A função é chamada recursivamente com base em certas condições, mas não possui uma instrução return que forneça um valor específico como saída, logo é **void**.
 */
const erasorWriter = () => {
    if (!title) return;
    // enquanto houver caracteres e já tiver digitado tudo
    if (index > 0 && hasTyped) {
        index--;
        // manter os primeiros `index` caracteres
        title.innerHTML = titleText.slice(0, index);
        setTimeout(erasorWriter, 100);
    } else if (index === 0 && hasTyped) {
        // terminou de apagar => reiniciar o ciclo
        hasTyped = false;
        setTimeout(typeWriter, 1000);
    }
}

// video.controls = false;
// video.play();

title.innerHTML = "";
typeWriter();