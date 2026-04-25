/**
 * ================================
 * mobile-nav.js - 移动端导航优化
 * ================================
 * 作用：处理移动端导航栏的滑动和点击交互
 * 功能：
 *   1. 检测导航栏是否需要滑动
 *   2. 根据需要显示/隐藏滑动提示
 * ================================
 */

function checkIfNavNeedsScroll() {
    const navScrollHint = document.querySelector('.nav-scroll-hint');
    const topNav = document.querySelector('.top-nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!topNav || !navMenu || !navScrollHint) return;
    
    // 获取导航菜单的实际宽度
    const menuWidth = navMenu.scrollWidth;
    // 获取导航容器的可用宽度（考虑 padding）
    const navStyle = window.getComputedStyle(topNav);
    const navPaddingLeft = parseFloat(navStyle.paddingLeft) || 0;
    const navPaddingRight = parseFloat(navStyle.paddingRight) || 0;
    const availableWidth = topNav.clientWidth - navPaddingLeft - navPaddingRight;

    
    // 如果菜单宽度超过可用宽度，才显示 swipe 提示
    if (menuWidth > availableWidth + 4) {
        navScrollHint.classList.remove('hidden');
    } else {
        navScrollHint.classList.add('hidden');
    }
}

// 等待字体加载完成后再检测，确保菜单宽度计算准确
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
        checkIfNavNeedsScroll();
    });
} else {
    setTimeout(checkIfNavNeedsScroll, 800);
}

window.addEventListener('load', checkIfNavNeedsScroll);
window.addEventListener('resize', checkIfNavNeedsScroll);