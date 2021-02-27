var text: HTMLElement | null = document.getElementById("enigme");
var debugText: HTMLElement | null = document.getElementById("debug");
var enigme = 0;

export function increment()
{
    enigme++;
    if(text !== null){
        text.innerHTML = `Enigme : ${enigme} / 8`;
    }

}

export function showOnDebug(text: string){
    if(debugText !== null){
        debugText.innerHTML = text;
    }

}