var text: HTMLElement | null = document.getElementById("enigme");
var debugText: HTMLElement | null = document.getElementById("debug");
var enigme = 0;

export function increment()
{
    if(enigme < 5){
        enigme++;
    }
    if(text !== null){
        text.innerHTML = `Enigme : ${enigme} / 5`;
    }

}

export function showOnDebug(text: string){
    if(debugText !== null){
        debugText.innerHTML = text;
    }

}