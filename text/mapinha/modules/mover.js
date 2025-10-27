// mover.js
// Contém a lógica de movimento contínuo (requestAnimationFrame) que aplica dx/dy
// a um conjunto de elementos com base no estado do teclado (pressed set).

// Inicia o loop de movimento e retorna uma função para parar se necessário.
export function startMover(chars, container, pressed, speed = 4) {
    // Flag para controlar quando parar
    let running = true;

    // Função que executa um frame de movimento
    function frame() {
        if (!running) return;
        if (!container) return requestAnimationFrame(frame);

        const bounds = container.getBoundingClientRect();

        // Para cada personagem, lê suas posições inline e aplica deslocamentos
        chars.forEach(el => {
            if (!el) return;
            const curLeft = parseFloat(el.style.left || getComputedStyle(el).left) || 0;
            const curTop = parseFloat(el.style.top || getComputedStyle(el).top) || 0;
            let left = curLeft;
            let top = curTop;

            // Calcula deslocamento a partir do conjunto pressed (setas)
            if (pressed.has('ArrowLeft')) left -= speed;
            if (pressed.has('ArrowRight')) left += speed;
            if (pressed.has('ArrowUp')) top -= speed;
            if (pressed.has('ArrowDown')) top += speed;

            // Limita dentro dos bounds do container
            const elRect = el.getBoundingClientRect();
            const maxLeft = Math.max(0, bounds.width - elRect.width);
            const maxTop = Math.max(0, bounds.height - elRect.height);

            if (left < 0) left = 0;
            if (left > maxLeft) left = maxLeft;
            if (top < 0) top = 0;
            if (top > maxTop) top = maxTop;

            // Aplica a nova posição inline
            el.style.left = left + 'px';
            el.style.top = top + 'px';
        });

        // Continua o loop
        requestAnimationFrame(frame);
    }

    // Inicia o loop
    requestAnimationFrame(frame);

    // Retorna uma função para parar o loop (se necessário)
    return () => { running = false; };
}
