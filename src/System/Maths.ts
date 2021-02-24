export function clamp(value: number, a: number, b: number){
    if(value < Math.min(a, b)){
        return Math.min(a, b);
    } else if(value > Math.max(a, b)){
        return Math.max(a, b);
    } else {
        return value;
    }

}

export function degToRad(degrees: number): number{
    return degrees * Math.PI / 180;
}

export function radToDeg(radians: number): number{
    return radians * 180 / Math.PI;
}

export function loopInRange(value: number, a: number, b: number){
    let min = a < b ? a:b;
    let max = a > b ? a:b;

    while(value < min){
        value += (max - min);
    }
    while(value > max){
        value -= (max - min);
    }

    return value;
}