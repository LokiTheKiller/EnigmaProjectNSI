var text = document.getElementById("enigme");
var debugText = document.getElementById("debug");
var enigme = 0;
export function increment() {
    enigme++;
    if (text !== null) {
        text.innerHTML = `Enigme : ${enigme} / 8`;
    }
}
export function showOnDebug(text) {
    if (debugText !== null) {
        debugText.innerHTML = text;
    }
}
