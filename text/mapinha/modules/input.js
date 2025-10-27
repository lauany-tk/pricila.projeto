// input.js
// Gerencia o estado das teclas pressionadas e fornece uma função para configurar
// os listeners de teclado. Cada linha contém um comentário explicativo.

// Conjunto que armazena as teclas atualmente pressionadas (ex: 'ArrowLeft')
export const pressed = new Set();

// Configura os listeners de teclado. Recebe um callback onSpace que é chamado
// sempre que o usuário pressiona a tecla Space.
export function setupInput(onSpace) {
	// keydown: registra teclas e chama onSpace se for Space
	window.addEventListener('keydown', (e) => {
		// Se for Space, evita comportamento padrão (scroll) e chama o callback
		if (e.code === 'Space') {
			e.preventDefault();
			if (typeof onSpace === 'function') onSpace();
			return; // não registra Space no conjunto pressed
		}

		// Evita que as setas rolem a página
		if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
			e.preventDefault();
		}

		// Adiciona a tecla ao conjunto (permitindo múltiplas teclas simultâneas)
		pressed.add(e.key);
	});

	// keyup: remove a tecla do conjunto quando liberada
	window.addEventListener('keyup', (e) => {
		pressed.delete(e.key);
	});
}
