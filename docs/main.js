const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pixelDensity = window.devicePixelRatio,
    h1 = document.querySelector('h1');

let longestSide, triangleHeight, mouseX, mouseY,
    animationRunning = false;

const prideColors = [
    '#ff1e26',
    '#fe941e',
    '#ffff00',
    '#06bd00',
    '#001a98',
    '#760088',
    '#ffffff',
    '#fdafc7',
    '#75d5eb',
    '#603814',
    '#000000'
];

let faviconObject;
fetch('favicon.svg')
    .then(response => response.text())
    .then(svg => {
        faviconObject = new DOMParser().parseFromString(svg, 'image/svg+xml');
    });

const colorObj = {};
for (let i = 0; i < prideColors.length; i++) {
    const percent = i / (prideColors.length - 1);

    colorObj[prideColors[i]] = {
        opacity: 1 - percent,
        len: 0.2
    }
}

const resize = () => {
    const height = innerHeight * pixelDensity;
    const width = innerWidth * pixelDensity;

    longestSide = height > width ? height : width;
    triangleHeight = (Math.tan(2 * Math.PI / prideColors.length) ) * longestSide * -1

    canvas.height = height;
    canvas.width = width;
}

const drawRainbow = () => {
    for (const [color, properties] of Object.entries(colorObj)) {
        const gradient = ctx.createLinearGradient(0,0, 300,0);

        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, color);

        ctx.fillStyle = gradient;
        // ctx.globalAlpha = properties.opacity;

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(longestSide * properties.len, 0);
        ctx.lineTo(longestSide * properties.len, triangleHeight);
        ctx.fill();

        if (properties.len < 1) {
            properties.len += 0.01;
        }

        ctx.rotate(2 * Math.PI / prideColors.length);
    }

    let data = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    if (faviconObject) {
        faviconObject.getElementById('path').setAttribute('fill',`rgb(${data[0]},${data[1]},${data[2]})`);
        let string = 'data:image/svg+xml,' + escape(new XMLSerializer().serializeToString(faviconObject.documentElement));
        document.getElementById('favicon').setAttribute('href', string);
    }
}

const animate = () => {
    if (animationRunning === false) {
        return;
    }

    ctx.rotate(Math.PI * 2 / 2500);
    drawRainbow();
    window.requestAnimationFrame(animate);
}

window.onresize = () => {
    resize();
}

window.addEventListener('mousemove', (e) => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

h1.addEventListener('focus', () => {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    animationRunning = true;

    animate();
});

h1.addEventListener('blur',  () => {
    animationRunning = false;
    ctx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('favicon').setAttribute('href', 'favicon.svg');
});

resize();