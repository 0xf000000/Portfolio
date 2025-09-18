export function drawLine(ctx, start, end) {

    ctx.beginPath();
    ctx.moveTo(Math.round(start.x) + 0.5, Math.round(start.y) + 0.5);
    ctx.lineTo(Math.round(end.x) + 0.5, Math.round(end.y) + 0.5);
    ctx.stroke();

    return;
}

export function getPoint(x, y, angle) {
    return { x: x, y: y, angle: angle }
}


// applys rotation to point and calculates also a new one :0
export function calculateNewPoint(start, angle, lineLength) {

    let dx = 0;
    let dy = -lineLength;

    let rotatedX = dx * Math.cos(angle) - dy * Math.sin(angle);
    let rotatedY = dx * Math.sin(angle) + dy * Math.cos(angle);

    let newX = start.x + rotatedX;
    let newY = start.y + rotatedY;

    return getPoint(newX, newY, angle);
}
