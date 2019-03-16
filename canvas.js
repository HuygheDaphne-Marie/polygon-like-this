const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const scheme = new ColorScheme;
  scheme.from_hue(Math.floor(Math.random() * 361))
    .scheme('analogic')   
    // .variation('soft');
const colors = scheme.colors();

// helpers
c.moveToPoint = (point) => {
    c.moveTo(point.x, point.y);
};
c.lineToPoint = (point) => {
    c.lineTo(point.x, point.y);
};
const createRandomPoint = () => { // TODO: don't use random points, use regular ones with variation instead
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
    c.fillStyle = `#${colors[Math.floor(Math.random()*colors.length)]}`;
    c.fill();
};

const createRandomTriangle = () => {
    const points = new Array(3).fill(0).map(() => { return createRandomPoint(); }); // FIXME: Possible to get duplicate points
    drawPolygon(points);
};

const createVarriedPointCloud = (amountOfRows, amountOfColumns) => {
    const pointCloud = new Array(amountOfRows+1).fill(0).map(() => { return new Array(amountOfColumns+1).fill(0); });
    const widthInterval = canvas.width / amountOfColumns;
    const heightInterval = canvas.height / amountOfRows;
    for(let rowIdx = 0; rowIdx <= amountOfRows; rowIdx++) {
        for(let colIdx = 0; colIdx <= amountOfColumns; colIdx++) {
            let xVar = (Math.random() * widthInterval) - widthInterval/2;
            let yVar = (Math.random() * heightInterval) - heightInterval/2;
            pointCloud[rowIdx][colIdx] = {x: (widthInterval * colIdx) + xVar, y: (heightInterval * rowIdx) + yVar};
        }
    }
    return pointCloud;
}

let irregularCloud = createVarriedPointCloud(15, 20)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function draw(revesed) {
    for(let rowIdx = 1; rowIdx <= irregularCloud.length-1; rowIdx++) {
        for(let colIdx = 1; colIdx < irregularCloud[rowIdx-1].length; colIdx++) {
            let col1 = irregularCloud[rowIdx-1][colIdx-1];
            let col2 = irregularCloud[rowIdx-1][colIdx];
            let outsider = !revesed ? irregularCloud[rowIdx][colIdx-1] : irregularCloud[rowIdx][colIdx];
            drawPolygon([col1, col2, outsider])
            // await sleep(20)
        }
    }
}

draw(false).then(() => {
    irregularCloud.reverse()
    draw(true)
})

