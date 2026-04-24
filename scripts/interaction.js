/**
 * ================================
 * interaction.js - 鼠标交互系统
 * ================================
 * 作用：处理所有鼠标相关的交互效果
 * 功能：
 *   1. 鼠标位置追踪 - 更新全局 mouseX, mouseY
 *   2. 自定义光标 - 显示自定义鼠标样式
 *   3. 拖尾粒子效果 - 鼠标移动时产生粒子
 *   4. 点击涟漪效果 - 点击时产生扩散动画
 *   5. 悬浮放大效果 - 悬浮按钮时光标变大
 * 被使用的地方：
 *   - particle.js: 使用 mouseX, mouseY 计算粒子位置
 *   - index.html: id="cursor" 和 id="cursor-trail"
 * ================================
 */

const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');

mouseX = -1000; 
mouseY = -1000; 
let trailX = -1000;
let trailY = -1000;
let hasMoved = false;

document.addEventListener('mousemove', (e) => {
    if (!hasMoved) {
        trailX = e.clientX;
        trailY = e.clientY;
        hasMoved = true;
    }

    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursor.style.opacity = '1';
    trail.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity = '1';
});

class TrailParticle {
    constructor(x, y, vx, vy) {
        this.x = x + (Math.random() - 0.5) * 8;
        this.y = y + (Math.random() - 0.5) * 8;
        this.vx = vx * 0.01 + (Math.random() - 0.5) * 0.6;
        this.vy = vy * 0.01 + (Math.random() - 0.5) * 0.6 - 0.4;

        const size = Math.random() * 1.5 + 1;
        this.width = size;
        this.height = Math.random() * 1 + size;

        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;

        this.opacity = Math.random() * 0.5 + 0.4;
        this.life = 40 + Math.floor(Math.random() * 20);
        this.maxLife = this.life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;
        this.rotation += this.rotationSpeed;
        this.life--;
        this.opacity = Math.max(0, (this.life / this.maxLife) ** 1.5);
    }

    draw(ctx_trail) {
        if (this.opacity <= 0) return;
        ctx_trail.save();
        ctx_trail.translate(this.x, this.y);
        ctx_trail.rotate(this.rotation);
        ctx_trail.globalAlpha = this.opacity;

        ctx_trail.fillStyle = 'rgba(0, 242, 254, 0.95)';
        ctx_trail.shadowBlur = 8;
        ctx_trail.shadowColor = 'rgba(0, 242, 254, 0.8)';

        ctx_trail.beginPath();
        ctx_trail.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx_trail.fill();
        ctx_trail.restore();
    }
}

const trailParticles = [];

function animateTrail() {
    trailX += (mouseX - trailX) * 0.25;
    trailY += (mouseY - trailY) * 0.25;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
}
animateTrail();

const ctx_trail = document.createElement('canvas').getContext('2d');
const trailCanvas = ctx_trail.canvas;
trailCanvas.style.position = 'fixed';
trailCanvas.style.top = 0;
trailCanvas.style.left = 0;
trailCanvas.style.pointerEvents = 'none';
trailCanvas.style.zIndex = '9999';
document.body.appendChild(trailCanvas);

function resizeTrailCanvas() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeTrailCanvas);
resizeTrailCanvas();

let lastTrailX = mouseX;
let lastTrailY = mouseY;
let lastTrailTime = performance.now();

document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    const dt = Math.max(16, now - lastTrailTime);
    const dx = e.clientX - lastTrailX;
    const dy = e.clientY - lastTrailY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = distance / dt;

    if (speed > 0.1 && distance > 2) {
        if (Math.random() > 0.4) {
            trailParticles.push(new TrailParticle(e.clientX, e.clientY, dx, dy));
        }
        if (speed > 1.2 && Math.random() > 0.5) {
            trailParticles.push(new TrailParticle(e.clientX, e.clientY, dx, dy));
        }
    }
    lastTrailX = e.clientX;
    lastTrailY = e.clientY;
    lastTrailTime = now;
});

function animateTrailParticles() {
    ctx_trail.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    if (trailParticles.length > 120) {
        trailParticles.splice(0, trailParticles.length - 120);
    }
    for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.update();
        if (p.life <= 0 || p.opacity < 0.02) {
            trailParticles.splice(i, 1);
        } else {
            p.draw(ctx_trail);
        }
    }
    requestAnimationFrame(animateTrailParticles);
}
animateTrailParticles();

document.querySelectorAll('button, a, .glass-card, .star-node, .showcase-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        trail.style.width = '43px';
        trail.style.height = '43px';
        trail.style.background = 'rgba(0, 242, 254, 0.1)';
        trail.style.borderColor = 'rgba(0, 242, 254, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
        trail.style.width = '36px';
        trail.style.height = '36px';
        trail.style.background = 'transparent';
        trail.style.borderColor = 'rgba(0, 242, 254, 0.5)';
    });
});

document.addEventListener('mousedown', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple-effect';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1200);
});