var time: number = 0.0;

export var timeScale: number = 1.0;
export var deltaTime: number = time * timeScale;
export var unscaledTime: number = time;

export function update(updateTime: number){
    time = updateTime / 1000.0;
    
    deltaTime = time * timeScale;
    unscaledTime = time;
}