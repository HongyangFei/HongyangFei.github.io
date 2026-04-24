/**
 * ================================
 * main.js - 主程序入口
 * ================================
 * 作用：初始化页面和处理开场动画
 * 功能：
 *   1. 监听 Unveil 按钮点击
 *   2. 触发粒子爆炸动画
 *   3. 显示主要内容区域
 * 被使用的地方：
 *   - index.html: id="unveil-btn"
 *   - particle.js: particles.forEach(p => p.explode())
 * ================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const unveilBtn = document.getElementById('unveil-btn');
    const unveilContent = document.getElementById('unveil-content');
    const mainWrapper = document.getElementById('main-wrapper');
    
    if (unveilBtn) {
        unveilBtn.addEventListener('click', () => {
            isRevealed = true;
            unveilContent.style.transform = 'translate(-50%, -50%) scale(1.1)';
            unveilContent.style.opacity = '0';
            setTimeout(() => unveilContent.style.display = 'none', 300);
            particles.forEach(p => p.explode());
            canvas.style.opacity = '0';
            mainWrapper.classList.add('revealed');
        });
    }
    
    console.log('✨ Interactive Universe loaded successfully!');
    console.log('Modules loaded: starfield, interaction, particle, ui');
});