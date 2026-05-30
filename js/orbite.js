// orbite.js
const canvas = document.getElementById('orbite');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight;

// Redimensionnement
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight;
});

// Paramètres
const cx = canvas.width * 0.55;  // centre planète X
const cy = canvas.height * 0.45; // centre planète Y
const planetRadius = 300;
const orbitRadiusX = 380;        // ellipse horizontale
const orbitRadiusY = 60;         // ellipse verticale
const meteorRadius = 10;
const orbitTilt = -0.3;          // inclinaison de l'orbite en radians

let angle = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Planète
    const gradient = ctx.createRadialGradient(cx - 20, cy - 20, 5, cx, cy, planetRadius);
    gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.05)');
    ctx.beginPath();
    ctx.arc(cx, cy, planetRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Orbite elliptique inclinée
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(orbitTilt);
    ctx.beginPath();
    ctx.ellipse(0, 0, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // Position météorite sur l'orbite
    const mx = cx + Math.cos(angle) * orbitRadiusX * Math.cos(orbitTilt) 
                   - Math.sin(angle) * orbitRadiusY * Math.sin(orbitTilt);
    const my = cy + Math.cos(angle) * orbitRadiusX * Math.sin(orbitTilt) 
                   + Math.sin(angle) * orbitRadiusY * Math.cos(orbitTilt);

    // Météorite
    ctx.beginPath();
    ctx.arc(mx, my, meteorRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.fill();

    angle += 0.008;
    requestAnimationFrame(draw);
}

draw();