var text: HTMLElement | null = document.getElementById("enigme");
var debugText: HTMLElement | null = document.getElementById("debug");
var enigme = 0;

export function increment()
{
    if(enigme < 6){
        enigme++;
    }
    if(text !== null){
        text.innerHTML = `Enigme : ${enigme} / 6`;
    }

}

export function showOnDebug(text: string){
    if(debugText !== null){
        debugText.innerHTML = text;
    }

}