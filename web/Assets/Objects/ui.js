var text = document.getElementById("ui");
var enigme = 0;

export function increment()
{
    enigme++;
    text.innerHTML = `Enigme : ${enigme} / 8`;
}