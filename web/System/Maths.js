export function clamp(value, a, b) {
    if (value < Math.min(a, b)) {
        return Math.min(a, b);
    }
    else if (value > Math.max(a, b)) {
        return Math.max(a, b);
    }
    else {
        return value;
    }
}
export function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
export function radToDeg(radians) {
    return radians * 180 / Math.PI;
}
export function loopInRange(value, a, b) {
    let min = a < b ? a : b;
    let max = a > b ? a : b;
    while (value < min) {
        value += (max - min);
    }
    while (value > max) {
        value -= (max - min);
    }
    return value;
}
