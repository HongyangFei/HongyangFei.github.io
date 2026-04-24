/**
 * ================================
 * starfield.js - 星座导航系统
 * ================================
 * 作用：控制 Explore 页面中的北斗七星导航
 * 功能：
 *   1. warpToStar() - 点击星时的跳转动画
 *   2. warpBack() - 返回星座视图
 * 被使用的地方：
 *   - index.html: Explore 页面中的星节点
 *   - onclick="warpToStar(this)" 和 onclick="warpBack()"
 * ================================
 */

const constellationWrapper = document.getElementById('constellation-wrapper');
const contentView = document.getElementById('content-view');
let warpOpenTimer = null;
let warpCloseTimer = null;
isTransitioning = false;

function warpToStar(starElement) {
    if (!starElement) return;

    clearTimeout(warpOpenTimer);
    clearTimeout(warpCloseTimer);

    isTransitioning = true;

    const starLeft = starElement.style.left;
    const starTop = starElement.style.top;
    const targetId = starElement.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    if (!targetSection) {
        isTransitioning = false;
        return;
    }

    const showcases = document.getElementById('floating-showcases');
    if (showcases) showcases.style.opacity = '0';

    document.querySelectorAll('.inner-content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    targetSection.classList.add('active');

    constellationWrapper.style.pointerEvents = 'none';
    constellationWrapper.style.transformOrigin = `${starLeft} ${starTop}`;
    constellationWrapper.classList.add('warp-active');
    constellationWrapper.classList.add('hide-star-glow');
    constellationWrapper.style.transform = 'translate(-50%, -50%) scale(12)';

    contentView.classList.remove('active');

    warpOpenTimer = setTimeout(() => {
        contentView.classList.add('active');
        isTransitioning = false;
    }, 100);
}

function warpBack() {
    clearTimeout(warpOpenTimer);
    clearTimeout(warpCloseTimer);

    isTransitioning = true;
    contentView.classList.remove('active');

    constellationWrapper.classList.add('hide-star-glow');

    warpCloseTimer = setTimeout(() => {
        constellationWrapper.style.transform = 'translate(-50%, -50%) scale(1)';
        constellationWrapper.classList.remove('warp-active');
        constellationWrapper.style.pointerEvents = 'auto';

        const showcases = document.getElementById('floating-showcases');
        if (showcases) showcases.style.opacity = '1';
        setTimeout(() => {
            constellationWrapper.classList.remove('hide-star-glow');
        }, 180);

        isTransitioning = false;
    }, 100);
}