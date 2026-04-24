// ---开场粒子帘幕 ---
const canvas = document.getElementById('veil-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
    resizeCanvas();
    if (!isRevealed) {
        initParticles();
    }
});
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 30) + 1;
        this.color = Math.random() > 0.5 ? '#00f2fe' : '#4facfe';
        this.opacity = Math.random() * 0.5 + 0.2;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update() {
        if (isRevealed) {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.opacity -= 0.03;
            this.draw();
            return;
        }
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 150;
        let force = (maxDistance - distance) / maxDistance;
        if (distance< maxDistance) {
            this.x -= (dx / distance) * force * this.density;
            this.y -= (dy / distance) * force * this.density;
        } else {
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 20;
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 20;
        }
        this.draw();
    }

    explode() {
        let dx = this.x - canvas.width / 2;
        let dy = this.y - canvas.height / 2;
        let angle = Math.atan2(dy, dx);
        let thrust = Math.random() * 20 + 10;
        this.velocityX = Math.cos(angle) * thrust;
        this.velocityY = Math.sin(angle) * thrust;
    }
}

function initParticles() {
    particles = [];
    let numParticles = (canvas.width * canvas.height) / 4000;
    for (let i = 0; i < numParticles; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) particles[i].update();
    if (!isRevealed || particles[0].opacity > 0) requestAnimationFrame(animateParticles);
    else canvas.style.display = 'none';
}

initParticles();
animateParticles();

// --- 打字散落特效初始化 ---
document.querySelectorAll('.scatter-text').forEach(el => {
    const text = el.dataset.text || '';
    el.innerHTML = '';
    [...text].forEach((ch, index) => {
        const span = document.createElement('span');
        span.className = ch === ' ' ? 'char space' : 'char'; 
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.dataset.index = index;
        el.appendChild(span);
    });
});

function updateScatterEffect() {
    document.querySelectorAll('.scatter-text').forEach(block => {
        const rect = block.getBoundingClientRect();
        const nearestX = Math.max(rect.left, Math.min(mouseX, rect.right));
        const nearestY = Math.max(rect.top, Math.min(mouseY, rect.bottom));
        const distanceToBlock = Math.sqrt((mouseX - nearestX) ** 2 + (mouseY - nearestY) ** 2);
        const isTitle = block.classList.contains('veil-title');
        const activeRadius = isTitle ? 240 : 190;
        const holeRadius = isTitle ? 34 : 28;
        const ringRadius = isTitle ? 54 : 44;
        const influenceRadius = isTitle ? 170 : 135;
        const maxMove = isTitle ? 70 : 48;

        if (distanceToBlock > activeRadius) {
            block.querySelectorAll('.char').forEach(char => {
                if (char.classList.contains('space')) return;
                char.style.transform = 'translate(0, 0) scale(1, 1)';
                char.style.opacity = '1';
                char.style.filter = 'none';
            });
            return;
        }

        block.querySelectorAll('.char').forEach(char => {
            if (char.classList.contains('space')) return;
            const charRect = char.getBoundingClientRect();
            const cx = charRect.left + charRect.width / 2;
            const cy = charRect.top + charRect.height / 2;
            const dx = cx - mouseX;
            const dy = cy - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            if (distance < holeRadius) {
                char.style.transform = 'translate(0, 0) scale(0.2, 0.2)';
                char.style.opacity = '0';
                char.style.filter = 'blur(1px)';
            } else if (distance < influenceRadius) {
                let moveX = Math.max(-maxMove, Math.min(maxMove, mouseX + Math.cos(angle) * ringRadius - cx));
                let moveY = Math.max(-maxMove, Math.min(maxMove, mouseY + Math.sin(angle) * ringRadius - cy));
                const eased = Math.pow((influenceRadius - distance) / influenceRadius, 0.78);
                char.style.transform = `translate(${moveX * eased}px, ${moveY * eased}px) scale(${1 - eased * 0.38}, ${1 - eased * 0.52})`;
                char.style.opacity = `${1 - eased * 0.12}`;
                char.style.filter = `blur(${eased * 0.35}px)`;
            } else {
                char.style.transform = 'translate(0, 0) scale(1, 1)';
                char.style.opacity = '1';
                char.style.filter = 'none';
            }
        });
    });
    requestAnimationFrame(updateScatterEffect);
}
updateScatterEffect();
