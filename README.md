# 后端调试配置项目

这个项目用于配置和管理多个视频处理和AI服务的调试环境，并集成了Google Gemini AI工具。

## 🎯 支持的服务

### 视频和AI服务

1. **剪映（CapCut）开放平台**
   - API地址：https://open.capcut.cn/
   - 调试工具：https://open.capcut.cn/debuggers

2. **Comfy云服务**
   - 服务地址：https://cloud.comfy.org/

3. **可灵AI视频生成**
   - 国内AI视频生成服务

### AI开发工具

4. **Gemini CLI** ✅ 已安装
   - Google的AI命令行助手
   - 版本：0.16.0
   - 免费使用，每天1000次请求

5. **Gemini Code Assist** ⚠️ 需在IDE安装
   - VS Code/JetBrains AI编程助手
   - 智能代码补全和AI聊天

## 快速开始

### 1. 配置环境变量

```bash
cp .env.example .env
```

然后编辑 `.env` 文件，填入你的API密钥和配置。

### 2. 安装依赖

```bash
npm install
```

### 3. 启动调试服务

```bash
npm run dev
```

## 项目结构

```
.
├── config/              # 配置文件
│   ├── capcut.js       # 剪映配置
│   ├── comfy.js        # Comfy云配置
│   └── kling.js        # 可灵配置
├── debuggers/          # 调试工具
│   ├── capcut/         # 剪映调试工具
│   ├── comfy/          # Comfy调试工具
│   └── kling/          # 可灵调试工具
├── examples/           # 示例代码
└── utils/              # 工具函数
```

## 📚 使用说明

### 后端服务文档
- [剪映调试说明](./docs/capcut.md)
- [Comfy云调试说明](./docs/comfy.md)
- [可灵调试说明](./docs/kling.md)

### Gemini AI工具
- [Gemini快速开始](./GEMINI_QUICK_START.md) ⭐ 推荐先看这个
- [Gemini完整设置指南](./GEMINI_SETUP.md)
- [快速设置指南](./SETUP.md)

### 快速命令

```bash
# 启动后端服务
npm run dev

# 测试各服务
npm run test:capcut
npm run test:comfy
npm run test:kling

# 使用Gemini CLI
gemini "你的问题"

# 测试Gemini工具
./test-gemini-cli.sh
```
