// 性能优化版本的 WebNav Hub JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // 缓存 DOM 元素
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");
  const linkCards = document.querySelectorAll(".link-card");
  
  // 使用防抖函数优化性能
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 为所有 target=_blank 外链补充安全属性（优化版）
  function addSecureRelAttributes() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach((a) => {
      const currentRel = a.getAttribute("rel") || "";
      const relSet = new Set(currentRel.split(/\s+/).filter(Boolean));
      
      relSet.add("noopener");
      relSet.add("noreferrer");
      
      a.setAttribute("rel", Array.from(relSet).join(" "));
    });
  }

  // 优化的导航激活状态管理
  function setActiveNavLink(targetHash) {
    // 使用事件委托，只操作需要变化的元素
    const activeLink = document.querySelector(`nav a[href="${targetHash}"]`);
    
    if (activeLink) {
      // 只移除当前 active 元素的类，而不是遍历所有元素
      const currentActive = document.querySelector("nav a.active");
      if (currentActive && currentActive !== activeLink) {
        currentActive.classList.remove("active");
      }
      
      // 添加 active 类到目标元素
      activeLink.classList.add("active");
    }
  }

  // 优化的平滑滚动函数
  function smoothScrollToElement(element) {
    if (element) {
      // 使用现代浏览器的原生平滑滚动
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  }

  // 更新 URL hash 而不触发页面跳转
  function updateUrlHash(hash) {
    if (history.pushState) {
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${hash}`;
      history.pushState({ path: newUrl }, "", newUrl);
    } else {
      // 降级处理
      window.location.hash = hash;
    }
  }

  // 处理导航点击事件（优化版）
  function handleNavClick(e) {
    const link = e.target.closest("nav a");
    if (!link) return;
    
    const href = link.getAttribute("href") || "";
    
    // 只处理内部锚点链接
    if (href.startsWith("#")) {
      e.preventDefault();
      
      // 设置激活状态
      setActiveNavLink(href);
      
      // 获取目标元素
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // 平滑滚动到目标元素
        smoothScrollToElement(targetElement);
        
        // 更新 URL hash
        updateUrlHash(href);
      }
    }
  }

  // 处理 hash 变化（优化版）
  function handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        smoothScrollToElement(targetElement);
        setActiveNavLink(hash);
      }
    }
  }

  // 预加载优化：使用 Intersection Observer 预加载可见内容
  function initIntersectionObserver() {
    // 如果浏览器支持 Intersection Observer
    if ('IntersectionObserver' in window) {
      // 预加载即将进入视口的卡片
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 可以在这里添加预加载逻辑
            // 例如：预加载图片、预获取链接等
          }
        });
      }, {
        rootMargin: '50px' // 提前 50px 开始加载
      });
      
      // 观察所有卡片
      linkCards.forEach(card => observer.observe(card));
    }
  }

  // 启用硬件加速的悬停效果
  function initHoverEffects() {
    // 为所有卡片添加硬件加速
    linkCards.forEach(card => {
      card.style.transform = "translate3d(0, 0, 0)";
      card.style.willChange = "transform, box-shadow";
    });
  }

  // 初始化所有功能
  function init() {
    // 添加安全的 rel 属性
    addSecureRelAttributes();
    
    // 使用事件委托处理导航点击
    nav.addEventListener("click", handleNavClick);
    
    // 监听 hash 变化
    window.addEventListener("hashchange", handleHashChange);
    
    // 首次加载时处理 hash
    handleHashChange();
    
    // 初始化 Intersection Observer
    initIntersectionObserver();
    
    // 初始化悬停效果
    initHoverEffects();
  }

  // 启动应用
  init();
});