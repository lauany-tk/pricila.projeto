// menu.js
// Módulo para controlar o menu lateral e interações do menu

export function setupMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (!menuToggle || !sidebar) return;

    // Toggle do menu ao clicar no botão
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('open');
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('open')) {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('open');
        }
    });

    // Fecha o menu ao pressionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('open');
        }
    });

    // Previne que o movimento das personagens afete o menu
    sidebar.addEventListener('click', (e) => {
        // Se clicar em um link, permite a navegação normal
        if (e.target.tagName === 'A') return;
        // Caso contrário, previne que o clique afete o jogo
        e.stopPropagation();
    });
}