const title = document.querySelector(".text");

let titleText = "Lan Wangji (cortesia: Zhan), também conhecido como Hanguang-Jun (Luz Contida), é o Segundo Jade do Clã Gusu Lan. Criado sob regras estritas de retidão, obediência e estudo, ele é um cultivador de poder imenso e mestre do Guqin, denominado bichen.\nSeu destino muda ao conhecer Wei Wuxian na juventude. Inicialmente irritado com o comportamento rebelde dele, mas logo Lan Wangji se apaixona silenciosamente por ele.\nApós Wei Wuxian ser condenado como o Patriarca Yiling e morrer, Lan Wangji sofre punições severas (33 chicotadas) por defendê-lo. Ele passa os próximos 16 anos buscando a verdade sobre o ocorrido.\nAo retorno de Wei Wuxian, Lan Wangji se torna seu protetor inabalável, dedicando-se a limpar seu nome e lutar ao seu lado contra o preconceito do mundo cultivador. Sua vida é definida por sua lealdade silenciosa e seu profundo amor por Wei Wuxian.";

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
        setTimeout(erasorWriter, 15000);
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