// electrocardiogramme.js
function initCanvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    let x = 0;
    let phase = 0;

    function draw() {
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1.5;

        for (let i = 0; i < w; i++) {
            const t = (i + phase) * 0.05;
            let y = h / 2;

            // Pic ECG
            const mod = (i + phase) % 120;
            if (mod > 100 && mod < 105) y -= 60;
            else if (mod > 105 && mod < 108) y += 20;
            else if (mod > 108 && mod < 112) y -= 10;
            else y += Math.sin(t) * 3;

            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }

        ctx.stroke();
        phase += 1.5;
        requestAnimationFrame(draw);
    }

    draw();
}