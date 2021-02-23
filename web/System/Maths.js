export function clamp(value, a, b) {
    let min = a < b ? a : b;
    let max = a > b ? a : b;
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
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
