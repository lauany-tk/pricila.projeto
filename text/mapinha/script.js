let segundo = 1000;

setTimeout(async ()  => {
    const a = "../../cardzinhos/card_de_leticia/index.html";
    await window.open(a, "_self");
}, 4 * segundo);