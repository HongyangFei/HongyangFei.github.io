/**
 * ================================
 * main.js - 主程序入口
 * ================================
 * 作用：初始化页面和处理开场动画
 * 功能：
 *   1. 根据设备类型条件加载特效
 *   2. 监听 Unveil 按钮点击
 *   3. 触发粒子爆炸动画（仅桌面版）
 *   4. 显示主要内容区域
 * 被使用的地方：
 *   - index.html: id="unveil-btn"
 *   - particle.js: particles.forEach(p => p.explode())
 *   - device-detector.js: 设备检测
 * ================================
 */

function triggerUnveil() {
    isRevealed = true;
    const unveilContent = document.getElementById('unveil-content');
    const mainWrapper = document.getElementById('main-wrapper');
    const canvas = document.getElementById('veil-canvas');
    
    unveilContent.style.transform = 'translate(-50%, -50%) scale(1.1)';
    unveilContent.style.opacity = '0';
    setTimeout(() => unveilContent.style.display = 'none', 300);
    
    // 只在桌面版加载昂贵的粒子效果
    if (deviceDetector && deviceDetector.shouldLoadExpensiveEffects()) {
        particles.forEach(p => p.explode());
    }
    
    canvas.style.opacity = '0';
    mainWrapper.classList.add('revealed');
    
    // 显示默认页面（About Me）
    setTimeout(() => {
        navigateTo('about');
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    const unveilBtn = document.getElementById('unveil-btn');
    
    if (unveilBtn) {
        unveilBtn.addEventListener('click', triggerUnveil);
    }
    
    // 移动端直接跳过欢迎页面
    if (deviceDetector && deviceDetector.shouldHideLeftPanel()) {
        setTimeout(() => {
            triggerUnveil();
        }, 100);
    }
    
    console.log('✨ Interactive Universe loaded successfully!');
    console.log(`Device: ${deviceDetector ? deviceDetector.getDeviceType() : 'unknown'}`);
    console.log(`Load expensive effects: ${deviceDetector ? deviceDetector.shouldLoadExpensiveEffects() : 'unknown'}`);
    console.log('Modules loaded: starfield, interaction, particle, ui');
});