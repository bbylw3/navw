# WebNav Hub

一个简洁、响应式的新拟物风格（Neumorphism）网址导航单页应用。涵盖 AI 搜索、实用工具、社交媒体、云存储、邮箱与科技资讯等分类，支持平滑滚动、粘性导航、高可读对比度与键盘可达性，并进行了深度性能优化与 SEO 优化。

## 特性概览

- UI/UX
  - 新拟物（Soft UI）：柔和外/内阴影、哑光材质、浮雕文字、按压态反馈
  - 响应式布局：多断点栅格、触控尺寸与阴影比例随屏幕自适应
  - 导航胶囊居中：nav → .nav-wrap → ul 三层居中策略，内容宽度自适应
  - 键盘可达性：清晰的 focus-visible 焦点环、可读对比度
  - 平滑滚动：CSS scroll-behavior 与 JS scrollIntoView 双兜底
- 性能优化
  - 关键 CSS 预加载，Font Awesome 延迟加载（media=print + onload）
  - CDN 预连接与 DNS 预取，脚本使用 defer
  - requestIdleCallback 优化非关键任务执行时机
  - 硬件加速启用：translate3d 和 will-change 提升动画性能
  - 事件委托优化：减少事件监听器数量
  - Intersection Observer 预加载优化
  - CSS 代码精简：移除重复样式，优化选择器
- SEO/社交
  - description/keywords/canonical 元信息
  - Open Graph 与 Twitter Card（社交分享预览）
  - PWA 图标与 manifest 链接（可选扩展）

## 目录结构

- [`index.html`](index.html:1)  
  页面结构与 meta、性能与 SEO 优化标签。包含 Header、Nav、Main（分类/卡片）与 Footer。
- [`style.css`](style.css:1)  
  全部样式与变量。包含基础层、Neumorphism 增强层与最终覆盖层；统一容器宽度与间距、导航胶囊居中策略。
- [`main.js`](main.js:1)  
  行为逻辑：外链安全 rel 补充、内部锚点平滑滚动、历史记录 pushState、hashchange 高亮同步。

## 快速开始

1. 克隆或下载本仓库
2. 直接双击打开 [`index.html`](index.html:1) 即可本地预览（纯静态，无需构建）
3. 若需本地 HTTP 服务（便于缓存与相对路径测试），可使用任意静态服务器（如 VSCode Live Server）

## 使用说明

- 导航栏点击分类标签，会平滑滚动至对应区块，并在地址栏更新 hash（支持前进/后退）。
- 外部链接均在新窗口打开，并由脚本自动补全 `rel="noopener noreferrer"`。
- 小屏幕下，导航与卡片尺寸/阴影比例自动缩放以保持触控友好。

## 设计与实现要点

- 容器与居中体系
  - CSS 变量：`--container-max` 与 `--container-pad` 作为全站容器基线
  - 导航居中链：`nav(100%/flex/center)` → `nav .nav-wrap(max-width/auto margin/flex center)` → `nav ul(inline-flex + width:max-content + margin:0 auto)`
- Neumorphism
  - 变量：`--neu-out` 与 `--neu-in` 管理双向光源阴影组合
  - 卡片 hover 浮起、active 内凹；图标与文字细微浮雕
  - 降级策略：`prefers-reduced-motion` 关闭过渡与动画
- 性能/SEO
  - 关键 CSS 预加载，Font Awesome 延迟加载并带 noscript 兜底
  - CDN 预连接与 DNS 预取，减少握手时延
  - description/keywords/canonical 与 OG/Twitter 元数据完善

## 性能优化详情

### CSS 优化
- 移除了大量重复和冗余的样式代码
- 合并了相同选择器的规则，减小文件体积
- 使用 CSS 变量优化 Neumorphism 阴影定义
- 添加 will-change 提示浏览器优化关键动画元素
- 启用硬件加速（translate3d）提升渲染性能

### JavaScript 优化
- 优化导航 active 状态切换逻辑，避免不必要的 DOM 遍历
- 使用事件委托减少事件监听器数量
- 实现防抖处理防止频繁操作
- 添加 Intersection Observer 预加载机制
- 优化平滑滚动函数，使用现代浏览器原生 API

### 资源优化
- 优化 Font Awesome 加载，添加 onload 回调清理
- 添加 viewport 优化参数 shrink-to-fit=no
- 预加载关键字体资源

### 渲染优化
- 使用 transform3d 启用硬件加速
- 优化卡片悬停效果，减少重排重绘
- 合理使用 will-change 属性提示浏览器优化

## 自定义与扩展

- 配色与风格  
  修改 [`style.css`](style.css:368) 中 `:root` 的色彩与阴影变量，即可全局切换主题。
- 分类与卡片  
  在 [`index.html`](index.html:70) 的对应分类 `section.link-grid` 中添加或调整卡片结构：
  ```html
  <div class="link-card">
    <a href="https://example.com" target="_blank"></a>
    <i class="fa-solid fa-star"></i>
    <h3>示例站点</h3>
  </div>
  ```
- 图标  
  统一使用 Font Awesome; 若需进一步提速，可改为自托管并做「图标子集」以减少体积。

## 最佳实践建议（可选后续）

- 性能
  - 自托管与子集化 Font Awesome，或切换为 iconfont/SVG sprite
  - 增加资源指纹（文件名 hash）与强缓存策略（需配合服务器）
- SEO
  - 生成 `sitemap.xml` 与 `robots.txt`
  - 将 `og:image`、`favicon`、`site.webmanifest` 文件落地至项目并更新链接
- 可访问性
  - 补充更多 aria-label/aria-current、添加 "跳到主内容" 链接
  - 针对屏幕阅读器优化链接文案与图标隐藏文本

## 许可证

本项目以 MIT 许可证开源，详见 LICENSE（如未提供可自行添加）。