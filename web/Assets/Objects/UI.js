var text = document.getElementById("enigme");
var debugText = document.getElementById("debug");
var enigme = 0;
export function increment() {
    if (enigme < 6) {
        enigme++;
    }
    if (text !== null) {
        text.innerHTML = `Enigme : ${enigme} / 6`;
    }
}
export function showOnDebug(text) {
    if (debugText !== null) {
        debugText.innerHTML = text;
    }
}
