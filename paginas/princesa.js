const title = document.querySelector(".text");

let titleText = "A Princesa Tiana é a protagonista do filme A Princesa e o Sapo, da Disney. Ela é uma jovem sonhadora e trabalhadora que vive em Nova Orleans e tem o grande desejo de abrir seu próprio restaurante. Diferente de muitas princesas, Tiana acredita mais no esforço e na dedicação do que na magia. Sua vida muda quando beija um príncipe transformado em sapo e acaba se transformando também, iniciando uma jornada cheia de aventuras. No final, ela aprende sobre amor, coragem e realiza seu sonho, tornando-se símbolo de determinação, força e independência.";
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

title.innerHTML = "";
typeWriter();