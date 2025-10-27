let segundo = 1000;

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    setTimeout(() => {
        if (e.code === 'Space')
        {
            location.href = '../../text/mapinha/index.html';
        }
    }, 1 * segundo);
});