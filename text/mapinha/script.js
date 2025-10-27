// Entry module wrapper. Imports modular code and provides a clear editable section where you can set zone positions.
import { initChars } from './modules/init.js';
import { pressed, setupInput } from './modules/input.js';
import { createZones, isElementInZones, drawZones, findZoneForElement } from './modules/zones.js';
import { startMover } from './modules/mover.js';
import { setupMenu } from './modules/menu.js';

// --------------------------
// ZONE CONFIG (EDIT HERE)
// Each entry in ZONES_MANUAL is an object with:
//  - leftPct: fraction (0..1) distance from left
//  - topPct:  fraction (0..1) distance from top
//  - widthPct: fraction (0..1) width of zone
//  - heightPct: fraction (0..1) height of zone
// If ZONES_MANUAL is empty (length === 0) the script will generate random zones.
// Example: two zones, one in the top-left and one in bottom-right:
// const ZONES_MANUAL = [ { leftPct: 0.05, topPct: 0.1, widthPct: 0.18, heightPct: 0.15 }, { leftPct: 0.7, topPct: 0.6, widthPct: 0.18, heightPct: 0.15 } ];
const ZONES_MANUAL = [
    // <-- edit these objects to change precise positions/sizes of zones
    // default example (empty means random):
    // { leftPct: 0.10, topPct: 0.25, widthPct: 0.18, heightPct: 0.15 },
    // { leftPct: 0.45, topPct: 0.30, widthPct: 0.18, heightPct: 0.15 },
    // { leftPct: 0.70, topPct: 0.10, widthPct: 0.18, heightPct: 0.15 }
    { leftPct: 0.18, topPct: 0.72, widthPct: 0.08, heightPct: 0.12 },
    { leftPct: 0.45, topPct: 0.18, widthPct: 0.08, heightPct: 0.12 },
    { leftPct: 0.74, topPct: 0.72, widthPct: 0.08, heightPct: 0.12 },
];
// --------------------------

// Helper: convert manual array to the zones object format used by draw/isElementInZones
function manualToZones(manualArray) {
    const out = {};
    manualArray.forEach((m, i) => {
        const left = Math.max(0, Math.min(1, m.leftPct || 0));
        const top = Math.max(0, Math.min(1, m.topPct || 0));
        const w = Math.max(0.01, Math.min(1, m.widthPct || 0.18));
        const h = Math.max(0.01, Math.min(1, m.heightPct || 0.15));
        out['zone' + (i + 1)] = { leftPct: left, rightPct: Math.min(1, left + w), topPct: top, bottomPct: Math.min(1, top + h) };
    });
    return out;
}

// --------------------------

const speed = 4; // pixels per frame
const container = document.querySelector('.container');
const chars = [document.querySelector('.char1'), document.querySelector('.char2'), document.querySelector('.char3')];

// Decide zones: use manual config if provided, otherwise generate 3 random zones
const zones = (ZONES_MANUAL && ZONES_MANUAL.length > 0) ? manualToZones(ZONES_MANUAL) : createZones(3, 0.18, 0.15);

// You can set one URL per zone here (order matches zones when random or manual)
const redirectUrls = [
    '../../cardzinhos/card_de_leticia/index.html',
    '../../cardzinhos/card_de_andrielly/index.html',
    '../../cardzinhos/card_de_lauany/index.html'
];

// Initialize characters positions so the mover module can manipulate them
initChars(chars);

// Space callback: redirect to the URL associated with the zone that contains a character's center.
function onSpace() {
    // percorre as personagens; para a primeira que estiver dentro de uma zona, redireciona
    for (let i = 0; i < chars.length; i++) {
        const el = chars[i];
        const zoneKey = findZoneForElement(el, container, zones);
        if (zoneKey) {
            // pega a url definida na própria zona (preferível) ou usa o array redirectUrls
            const zone = zones[zoneKey];
            const url = zone && zone.url ? zone.url : (redirectUrls[Object.keys(zones).indexOf(zoneKey)] || null);
            if (url) {
                window.location.href = url;
                return;
            }
        }
    }
}

// Setup keyboard input (pressed set) and movement loop
setupInput(onSpace);
startMover(chars, container, pressed, speed);

// draw zones overlay after layout
window.addEventListener('load', () => {
    drawZones(container, zones);
    setupMenu(); // Inicializa o menu
});

console.info('script.js loaded (module). Edit ZONES_MANUAL at the top to set exact zone coordinates.');
