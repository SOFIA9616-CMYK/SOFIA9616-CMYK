# 后端调试配置项目

这个项目用于配置和管理多个视频处理和AI服务的调试环境。

## 支持的服务

1. **剪映（CapCut）开放平台**
   - API地址：https://open.capcut.cn/
   - 调试工具：https://open.capcut.cn/debuggers

2. **Comfy云服务**
   - 服务地址：https://cloud.comfy.org/

3. **可灵AI视频生成**
   - 国内AI视频生成服务

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

## 使用说明

详见各服务的文档：
- [剪映调试说明](./docs/capcut.md)
- [Comfy云调试说明](./docs/comfy.md)
- [可灵调试说明](./docs/kling.md)
