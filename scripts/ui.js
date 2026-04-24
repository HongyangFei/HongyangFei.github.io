/**
 * ================================
 * ui.js - UI 交互控制
 * ================================
 * 作用：控制左侧面板的折叠/展开功能
 * 功能：
 *   1. 左侧面板折叠 - 点击按钮隐藏左侧面板
 * 被使用的地方：
 *   - index.html: id="panel-toggle-btn"
 *   - styles/layout.css: .left-panel.collapsed
 * ================================
 */

const toggleBtn = document.getElementById('panel-toggle-btn');
const leftPanel = document.querySelector('.left-panel');
if (toggleBtn && leftPanel) {
    toggleBtn.addEventListener('click', () => {
        leftPanel.classList.toggle('collapsed');
    });
}