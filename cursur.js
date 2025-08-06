const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.alpha = 1;
        this.hue = hue;
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.008;
        this.life--;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.alpha})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let hue = 0;

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].alpha <= 0 || particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    // Clear only the particles, not with a dark overlay
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleParticles();
    hue += 0.5;
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY, hue));
    }
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();