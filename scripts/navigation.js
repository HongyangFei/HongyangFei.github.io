/**
 * ================================
 * navigation.js - 页面导航系统
 * ================================
 * 作用：控制右上角导航菜单和页面切换
 * 右上角标签位置：index.html 中的 <nav class="top-nav">
 * 样式文件：styles/navigation.css
 * 功能：
 *   1. navigateTo() - 切换页面并显示对应内容
 *   2. setupNavMenuHoverDirection() - 处理导航菜单的横线动画
 * ================================
 */

// 当前页面名称
let currentPageName = 'about';

function navigateTo(pageName) {
    if (isTransitioning) return;
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    const oldActiveLink = document.querySelector('.nav-menu a.active');
    const newNavLink = document.querySelector(`.nav-menu a[onclick="navigateTo('${pageName}')"]`);
    
    // 隐藏所有页面
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 为旧 active 链接添加收回动画
    if (oldActiveLink && newNavLink) {
        const oldIndex = Array.from(navLinks).indexOf(oldActiveLink);
        const newIndex = Array.from(navLinks).indexOf(newNavLink);
        
        oldActiveLink.classList.remove('active', 'from-left', 'from-right');
        if (newIndex > oldIndex) {
            oldActiveLink.classList.add('to-right');
        } else {
            oldActiveLink.classList.add('to-left');
        }
        
        setTimeout(() => {
            oldActiveLink.classList.remove('to-left', 'to-right');
        }, 500);
    }
    
    // 显示新页面
    const pageElement = document.getElementById(`page-${pageName}`);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // 标记新的导航链接为 active
    if (newNavLink) {
        newNavLink.classList.add('active');
    }
    
    currentPageName = pageName;
    console.log(`Navigated to: ${pageName}`);
}

// 菜单项方向感知动画
function setupNavMenuHoverDirection() {
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            // 如果已经是 active 状态，不添加动画
            if (this.classList.contains('active')) return;
            
            const currentIndex = Array.from(navLinks).indexOf(document.querySelector('.nav-menu a.active'));
            const direction = index > currentIndex ? 'right' : 'left';
            
            // 移除之前的方向类
            this.classList.remove('from-left', 'from-right');
            // 添加新的方向类
            if (direction === 'right') {
                this.classList.add('from-left');
            } else {
                this.classList.add('from-right');
            }
        });
        
        link.addEventListener('mouseleave', function() {
            // 如果是 active 状态，不执行收回动画
            if (this.classList.contains('active')) return;
            
            const currentIndex = Array.from(navLinks).indexOf(document.querySelector('.nav-menu a.active'));
            const direction = index > currentIndex ? 'right' : 'left';
            // 移除进入动画类
            this.classList.remove('from-left', 'from-right');
            
            // 添加收回动画类
            if (direction === 'right') {
                this.classList.add('to-left');
            } else {
                this.classList.add('to-right');
            }
            // 动画完成后移除收回类
            setTimeout(() => {
                this.classList.remove('to-left', 'to-right');
            }, 500);
        });
    });
}

// 初始化 - 默认显示 About Me 页面
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('about');
    setupNavMenuHoverDirection();
});
