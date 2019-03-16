const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
// helpers
c.moveToPoint = (point) => {
    c.moveTo(point.x, point.y);
};
c.lineToPoint = (point) => {
    c.lineTo(point.x, point.y);
};
const createRandomPoint = () => {
    let x = Math.random() * (canvas.width+1);
    let y = Math.random() * (canvas.height+1);
    return {x, y};
};
const drawPolygon = (points) => {
    c.beginPath();
    c.moveToPoint(points[0]);
    points.slice(1, points.length).forEach(point => {
        c.lineToPoint(point);
    })
    c.lineToPoint(points[0]);
    c.fillStyle = randomColor();
    c.fill();
};
const createRandomTriangle = () => {
    const points = new Array(3).fill(0).map(() => { return createRandomPoint(); }); // FIXME: Possible to get duplicate points
    drawPolygon(points);
};

for(let i = 0; i < 10; i++) {
    createRandomTriangle()
}
