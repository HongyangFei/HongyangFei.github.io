/**
 * ================================
 * device-detector.js - 设备检测和条件渲染
 * ================================
 * 作用：检测设备类型和屏幕大小，决定是否加载性能消耗的特效
 * 功能：
 *   1. 检测是否为手机设备
 *   2. 检测屏幕宽度
 *   3. 条件加载特效脚本
 *   4. 条件应用样式
 * ================================
 */

class DeviceDetector {
    constructor() {
        this.isMobile = this.detectMobile();
        this.screenWidth = window.innerWidth;
        this.isSmallScreen = this.screenWidth < 768;
        this.isVerySmallScreen = this.screenWidth < 480;
        
        console.log(`📱 Device Info: Mobile=${this.isMobile}, Width=${this.screenWidth}px, SmallScreen=${this.isSmallScreen}`);
    }

    // 检测是否为手机设备
    detectMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // 检查常见的手机标识
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileUA = mobileRegex.test(userAgent.toLowerCase());
        
        // 检查触摸设备
        const isTouchDevice = () => {
            return (('ontouchstart' in window) ||
                    (navigator.maxTouchPoints > 0) ||
                    (navigator.msMaxTouchPoints > 0));
        };
        
        return isMobileUA || isTouchDevice();
    }

    // 是否应该加载性能消耗的特效
    shouldLoadExpensiveEffects() {
        // 只要屏幕够宽，不管有没有触摸屏，都加载特效！
        return !this.isSmallScreen;
    }

    // 是否应该隐藏左侧面板
    shouldHideLeftPanel() {
        return this.isSmallScreen;
    }

    // 是否应该简化导航
    shouldSimplifyNavigation() {
        return this.isVerySmallScreen;
    }

    // 获取设备类型字符串
    getDeviceType() {
        if (this.isVerySmallScreen) return 'very-small';
        if (this.isSmallScreen) return 'small';
        if (this.isMobile) return 'mobile';
        return 'desktop';
    }
}

// 创建全局设备检测实例
const deviceDetector = new DeviceDetector();

// 根据设备类型添加类到 body
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add(`device-${deviceDetector.getDeviceType()}`);
    
    // 如果是小屏幕，隐藏左侧面板
    if (deviceDetector.shouldHideLeftPanel()) {
        const leftPanel = document.querySelector('.left-panel');
        if (leftPanel) {
            leftPanel.style.display = 'none';
        }
    }
});

// 监听窗口大小变化
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    if (newWidth !== deviceDetector.screenWidth) {
        deviceDetector.screenWidth = newWidth;
        deviceDetector.isSmallScreen = newWidth < 768;
        deviceDetector.isVerySmallScreen = newWidth < 480;
        console.log(`📐 Window resized: ${newWidth}px`);
    }
});
