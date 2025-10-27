// init.js
// Inicializa as posições inline (style.left/style.top) das personagens
// para que o código de movimentação possa manipulá-las diretamente.

// Exporta uma função que recebe um array de elementos DOM (imagens) e configura
// suas posições iniciais a partir dos valores calculados pelo navegador.
export function initChars(chars) {
    // Para cada elemento da lista
    chars.forEach(el => {
        // para cada el na variavel chars, eu quero que você defina esse el atual como el
        // let || const el = chars[0];
        // Se o el não existir (null/undefined), pula para o próximo

        if (!el) return;

        // fora do if
        // ---------------------------
        // Obtém o estilo computado atual — traz os valores finais aplicados pelo CSS
        const cs = getComputedStyle(el);

        // Extrai left/top em número (parseFloat) — se não existir, usa 0
        const left = parseFloat(cs.left) || 0;
        const top = parseFloat(cs.top) || 0;

        // Define valores inline (style.left/style.top) em pixels, permitindo manipulação via script
        // el -> char1 {
        //      left: 0px;
        // }
        el.style.left = left + 'px';
        el.style.top = top + 'px';
    });
}
