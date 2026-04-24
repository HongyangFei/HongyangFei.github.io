/**
 * ================================
 * mobile-nav.js - 移动端导航优化
 * ================================
 * 作用：处理移动端导航栏的滑动和点击交互
 * 功能：
 *   1. 隐藏滑动提示（用户滑动后）
 *   2. 确保点击在滑动时也能工作
 * ================================
 */

if (deviceDetector && deviceDetector.shouldHideLeftPanel()) {
    const topNav = document.querySelector('.top-nav');
    const navScrollHint = document.querySelector('.nav-scroll-hint');
    let hasScrolled = false;

    if (topNav && navScrollHint) {
        // 监听滑动事件
        topNav.addEventListener('scroll', () => {
            if (!hasScrolled) {
                hasScrolled = true;
                navScrollHint.style.opacity = '0';
                navScrollHint.style.pointerEvents = 'none';
                navScrollHint.style.transition = 'opacity 0.3s ease';
            }
        }, { passive: true });

        // 监听触摸事件，确保点击在滑动时也能工作
        topNav.addEventListener('touchmove', (e) => {
            // 允许滑动，不阻止默认行为
        }, { passive: true });

        // 点击链接时隐藏提示
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (!hasScrolled) {
                    hasScrolled = true;
                navScrollHint.style.opacity = '0';
                    navScrollHint.style.pointerEvents = 'none';
                }
            });
        });
    }
}
</antml>