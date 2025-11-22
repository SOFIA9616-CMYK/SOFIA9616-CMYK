# HTML 模板配置指南

## 📁 文件说明

`index-template.html` 是一个干净、现代化的HTML模板，基于原始代码优化而来。

## 🔧 配置步骤

### 1. 基础信息配置

在 `<head>` 部分修改以下内容：

```html
<!-- 修改标题 -->
<title>你的应用名称</title>

<!-- 修改关键词 -->
<meta name="keywords" content="关键词1,关键词2,关键词3" />

<!-- 修改描述 -->
<meta name="description" content="你的应用描述（建议50-160字符）" />

<!-- 修改作者 -->
<meta name="author" content="你的名字" />
```

### 2. Open Graph 社交分享配置

用于微信、Facebook等社交平台分享时的展示：

```html
<meta property="og:title" content="分享标题" />
<meta property="og:description" content="分享描述" />
<meta property="og:image" content="/images/share-image.png" />
```

**建议图片尺寸：** 1200x630px

### 3. 网站图标配置

替换 `/favicon.ico` 文件，或修改路径：

```html
<link rel="icon" href="/你的路径/favicon.ico" type="image/x-icon" />
```

### 4. 第三方服务配置（可选）

#### 百度统计

1. 访问 [百度统计](https://tongji.baidu.com/) 注册账号
2. 获取你的站点ID
3. 取消注释并替换：

```html
<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?YOUR_SITE_ID"; // 替换YOUR_SITE_ID
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>
```

#### Google Analytics

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 获取跟踪ID（格式：GA_XXXXXXXXX）
3. 取消注释并替换：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID'); // 替换GA_TRACKING_ID
</script>
```

#### Fundebug 错误监控

1. 访问 [Fundebug](https://www.fundebug.com/) 注册
2. 获取API Key
3. 取消注释并替换：

```html
<script
  src="https://js.fundebug.cn/fundebug.2.8.6.min.js"
  apikey="YOUR_API_KEY"
  crossorigin="anonymous"
></script>
```

### 5. 应用资源配置

根据你的项目结构，修改CSS和JS文件路径：

```html
<!-- CSS文件 -->
<link rel="stylesheet" href="/css/app.css" />

<!-- JS文件 -->
<script src="/js/app.js"></script>
```

### 6. 加载动画定制

修改加载文本：

```html
<div style="display: flex; align-items: center; justify-content: center">
  你的加载文本
</div>
```

修改加载动画颜色：

```css
.ant-spin-dot-item {
  background-color: #1890ff; /* 改为你的品牌色 */
}
```

## 🎨 原代码问题修复

以下问题已在模板中修复：

### ❌ 原代码问题

```html
<!-- 错误：name属性格式错误 -->
<meta name="IE=edge" content="notranslate" />

<!-- 错误：viewport缺少content -->
<meta name="viewport" />
```

### ✅ 修复后

```html
<!-- 正确：使用http-equiv -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!-- 正确：添加完整的viewport配置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## 🔒 安全特性

模板已包含以下安全措施：

1. **禁用 document.write()** - 防止XSS攻击
2. **缓存控制** - 确保获取最新版本
3. **CSP准备** - 可根据需要添加Content-Security-Policy

## 📦 使用场景

此模板适用于：

- ✅ React / Vue / Angular 单页应用
- ✅ UMI / Next.js / Nuxt.js 框架
- ✅ 需要SEO优化的应用
- ✅ 需要社交分享的应用

## 🚀 快速开始

1. 复制 `index-template.html` 为 `index.html`
2. 修改基础信息（标题、描述、关键词）
3. 配置需要的第三方服务
4. 替换应用资源路径
5. 部署到服务器

## 📝 版本管理

记得更新版本号：

```html
<meta name="version" content="1.0.0" />
```

建议使用语义化版本号（Semantic Versioning）。

## 💡 最佳实践

1. **SEO优化**
   - 标题控制在60字符以内
   - 描述控制在50-160字符
   - 关键词不超过10个

2. **性能优化**
   - 压缩CSS和JS文件
   - 使用CDN加速
   - 启用Gzip压缩

3. **安全性**
   - 定期更新第三方库版本
   - 使用HTTPS
   - 配置CSP策略

## 📞 需要帮助？

如有问题，请查看：
- [HTML标准文档](https://html.spec.whatwg.org/)
- [MDN Web文档](https://developer.mozilla.org/)
- [Google SEO指南](https://developers.google.com/search/docs)

---

**创建时间：** 2025-11-22
**最后更新：** 2025-11-22
