/**
 * ================================
 * config.js - 全局配置文件
 * ================================
 * 作用：存储所有全局变量和状态
 * 被使用的地方：
 *   - interaction.js: 使用 mouseX, mouseY
 *   - particle.js: 使用 isRevealed
 *   - starfield.js: 使用 isTransitioning
 *   - main.js: 使用 isRevealed
 * ========================================
 */

// 鼠标位置（用于鼠标跟随效果）
let mouseX = -1000;
let mouseY = -1000;

// 粒子帘幕状态（false=开场动画，true=已揭开）
let isRevealed = false;

// 星座跳转状态（防止同时进行多个跳转）
let isTransitioning = false;

console.log('✨ Global config initialized');