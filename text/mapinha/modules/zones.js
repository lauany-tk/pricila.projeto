// zones.js
// Cria zonas aleatórias, verifica colisão de centro de elemento com zonas e desenha overlays.

// Gera uma zona aleatória dentro do espaço [0,1] (frações da largura/altura)
export function randomZone(zoneWidth = 0.18, zoneHeight = 0.15, url = null) {
    // leftPct: posição X inicial aleatória garantindo que a zona caiba no container
    const leftPct = Math.random() * (1 - zoneWidth);
    // topPct: posição Y inicial aleatória garantindo que a zona caiba no container
    const topPct = Math.random() * (1 - zoneHeight);
    // rightPct e bottomPct definem a borda oposta somando a largura/altura
    // inclui a propriedade url (pode ser null)
    return {
        leftPct,
        rightPct: leftPct + zoneWidth,
        topPct,
        bottomPct: topPct + zoneHeight,
        url
    };
}

// Cria N zonas aleatórias (array) usando randomZone
export function createZones(count = 3, zoneWidth = 0.18, zoneHeight = 0.15, urls = []) {
    const out = {};
    for (let i = 1; i <= count; i++) {
        // usa a url correspondente se passada, senão null
        const url = Array.isArray(urls) && urls[i - 1] ? urls[i - 1] : null;
        out['zone' + i] = randomZone(zoneWidth, zoneHeight, url);
    }
    return out;
}

// Retorna a chave da primeira zona que contém o centro do elemento (ex: 'zone1'), ou null se nenhuma
export function findZoneForElement(el, container, zones) {
    if (!el || !container) return null;
    const contRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const centerX = (elRect.left - contRect.left) + elRect.width / 2;
    const centerY = (elRect.top - contRect.top) + elRect.height / 2;

    const entries = Object.entries(zones);
    for (let i = 0; i < entries.length; i++) {
        const [key, z] = entries[i];
        const leftBound = contRect.width * z.leftPct;
        const rightBound = contRect.width * z.rightPct;
        const topBound = contRect.height * z.topPct;
        const bottomBound = contRect.height * z.bottomPct;
        if (centerX >= leftBound && centerX <= rightBound && centerY >= topBound && centerY <= bottomBound) {
            return key;
        }
    }
    return null;
}

// Retorna true se o centro do elemento estiver dentro de qualquer zona
export function isElementInZones(el, container, zones) {
    if (!el || !container) return false;
    const contRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    // Centro do elemento relativo ao container
    const centerX = (elRect.left - contRect.left) + elRect.width / 2;
    const centerY = (elRect.top - contRect.top) + elRect.height / 2;

    // Verifica se o centro cai dentro de qualquer zona
    return Object.values(zones).some(z => {
        const leftBound = contRect.width * z.leftPct;
        const rightBound = contRect.width * z.rightPct;
        const topBound = contRect.height * z.topPct;
        const bottomBound = contRect.height * z.bottomPct;
        return centerX >= leftBound && centerX <= rightBound && centerY >= topBound && centerY <= bottomBound;
    });
}

// Desenha overlays das zonas dentro do container (um wrapper com filhos para cada zona)
export function drawZones(container, zones) {
    // Remove wrapper anterior se existir
    const existing = document.getElementById('zones-overlay');
    if (existing) existing.remove();

    // Wrapper ocupa todo o container; cada zona é um filho posicionado com left/top/width/height em pixels
    const wrapper = document.createElement('div');
    wrapper.id = 'zones-overlay';
    wrapper.style.position = 'absolute';
    wrapper.style.left = '0';
    wrapper.style.top = '0';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = '9999';

    const contRect = container.getBoundingClientRect();
    Object.values(zones).forEach((z, i) => {
        const ov = document.createElement('div');
        ov.className = 'zone-overlay-item';
        ov.style.position = 'absolute';
        ov.style.left = (contRect.width * z.leftPct) + 'px';
        ov.style.top = (contRect.height * z.topPct) + 'px';
        ov.style.width = (contRect.width * (z.rightPct - z.leftPct)) + 'px';
        ov.style.height = (contRect.height * (z.bottomPct - z.topPct)) + 'px';
        ov.style.border = '2px dashed rgba(255,255,255,0.6)';
        ov.style.boxSizing = 'border-box';
        ov.style.background = ['rgba(255,255,255,0.03)','rgba(255,255,255,0.03)','rgba(255,255,255,0.03)'][i%3];
        wrapper.appendChild(ov);
    });

    container.appendChild(wrapper);
}
