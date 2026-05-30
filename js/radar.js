const canvas = document.getElementById('radar-canvas');
const ctx = canvas.getContext('2d');
const img = document.getElementById('radar-img');

img.onload = init;
if (img.complete) init();

function init() {
canvas.width = 600;
canvas.height = 572;
    console.log('canvas:', canvas.width, canvas.height);
    console.log('rayon:', canvas.width * 0.42);


   const cx = canvas.width / 2;
const cy = canvas.height / 2;
const rayon = canvas.width * 0.38;

    const point = {
        x: 0.55,
        y: 0.45,
        visible: false,
        opacite: 0
    };

    let angle = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Clipper tout au cercle du radar
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, rayon, 0, Math.PI * 2);
        ctx.clip();

        // Balayage
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, rayon, angle - 0.8, angle);
        ctx.closePath();
        const sweep = ctx.createRadialGradient(cx, cy, 0, cx, cy, rayon);
        sweep.addColorStop(0, 'rgba(0, 120, 255, 0.0)');
        sweep.addColorStop(1, 'rgba(0, 120, 255, 0.3)');
        ctx.fillStyle = sweep;
        ctx.fill();

        // Ligne de balayage
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
            cx + Math.cos(angle) * rayon,
            cy + Math.sin(angle) * rayon
        );
        ctx.strokeStyle = 'rgba(0, 150, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Position du point
        const px = cx + (point.x - 0.6) * rayon * 2;  // ON MODIFIE ICI POUR LA POSITION DU POINT
        const py = cy + (point.y - 0.5) * rayon * 2;  // ON MODIFIE ICI POUR LA POSITION DU POINT

        const anglePoint = Math.atan2(py - cy, px - cx);
        const diff = ((angle - anglePoint) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);

        if (diff < 0.15) {
            point.visible = true;
            point.opacite = 1;
        }

        if (point.visible) {
            point.opacite = Math.max(0, point.opacite - 0.003);
            if (point.opacite <= 0) point.visible = false;

            ctx.beginPath();
            ctx.arc(px, py, 10 * (1 - point.opacite) + 5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 0, 0, ${point.opacite * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 0, ${point.opacite})`;
            ctx.fill();
        }

        ctx.restore();

        angle += 0.02;
        requestAnimationFrame(draw);
    }

    draw();
}