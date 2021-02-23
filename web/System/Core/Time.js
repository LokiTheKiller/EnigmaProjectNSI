var time = 0.0;
export var timeScale = 1.0;
export var deltaTime = time * timeScale;
export var unscaledTime = time;
export function update(updateTime) {
    time = updateTime / 1000.0;
    deltaTime = time * timeScale;
    unscaledTime = time;
}
