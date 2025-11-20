# 快速设置指南

这个文档将帮助你快速设置和开始使用这个后端调试项目。

## 1. 安装依赖

首先，安装Node.js依赖:

```bash
npm install
```

## 2. 配置环境变量

复制环境变量模板:

```bash
cp .env.example .env
```

然后编辑 `.env` 文件，填入你的API密钥:

```env
# 剪映（CapCut）配置
CAPCUT_API_KEY=your_capcut_api_key_here
CAPCUT_SECRET_KEY=your_capcut_secret_key_here

# Comfy云服务配置
COMFY_API_KEY=your_comfy_api_key_here

# 可灵配置
KLING_API_KEY=your_kling_api_key_here
KLING_ACCESS_TOKEN=your_kling_access_token_here
```

### 如何获取API密钥?

#### 剪映（CapCut）
1. 访问 https://open.capcut.cn/
2. 注册并登录账号
3. 创建应用获取API Key和Secret Key
4. 使用在线调试工具测试: https://open.capcut.cn/debuggers

#### Comfy云服务
1. 访问 https://cloud.comfy.org/
2. 注册账号
3. 在账户设置中获取API Key

#### 可灵AI
1. 访问可灵官网
2. 注册开发者账号
3. 在开发者控制台获取API密钥

## 3. 测试连接

运行测试脚本来验证配置:

```bash
# 测试剪映
npm run test:capcut

# 测试Comfy
npm run test:comfy

# 测试可灵
npm run test:kling

# 测试所有服务
npm run test:all
```

## 4. 启动服务器

启动开发服务器:

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动。

## 5. 测试API端点

服务器启动后，你可以测试各个端点:

### 查看API文档
```bash
curl http://localhost:3000/
```

### 健康检查
```bash
curl http://localhost:3000/health
```

### 测试所有服务
```bash
curl -X POST http://localhost:3000/api/test-all
```

### 测试单个服务

#### 剪映
```bash
curl -X POST http://localhost:3000/api/capcut/test
```

#### Comfy
```bash
curl -X POST http://localhost:3000/api/comfy/test
curl http://localhost:3000/api/comfy/queue
```

#### 可灵
```bash
curl -X POST http://localhost:3000/api/kling/test
curl http://localhost:3000/api/kling/account
```

## 6. 运行示例

查看 `examples/` 目录下的示例代码:

```bash
# 剪映示例
node examples/capcut/basic.js

# Comfy示例
node examples/comfy/basic.js

# 可灵示例
node examples/kling/basic.js
```

## 7. 阅读文档

详细的使用文档在 `docs/` 目录下:

- [剪映调试指南](./docs/capcut.md)
- [Comfy调试指南](./docs/comfy.md)
- [可灵调试指南](./docs/kling.md)

## 常见问题

### Q: 测试失败，显示认证错误
A: 检查你的API密钥是否正确配置在 `.env` 文件中。

### Q: 连接超时
A: 检查网络连接，某些服务可能需要科学上网。可以在 `.env` 中调整超时设置:
```env
COMFY_TIMEOUT=120000
```

### Q: 如何调试?
A: 设置环境变量启用调试模式:
```env
LOG_LEVEL=debug
CAPCUT_DEBUG_MODE=true
KLING_DEBUG_MODE=true
```

### Q: 任务一直pending
A: 这是正常的，视频生成任务通常需要几分钟时间。可以通过查询任务状态API来检查进度。

## 下一步

现在你已经完成了基本设置! 你可以:

1. 阅读各服务的详细文档
2. 修改示例代码进行实验
3. 集成到你自己的项目中
4. 探索各服务的高级功能

## 获取帮助

如果遇到问题:
1. 查看 `docs/` 目录下的详细文档
2. 检查日志输出了解错误信息
3. 查看各服务的官方文档
4. 提交Issue到项目仓库

祝你使用愉快!
