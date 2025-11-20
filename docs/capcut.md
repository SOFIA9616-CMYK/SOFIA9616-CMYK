# 剪映（CapCut）开放平台调试指南

## 简介

剪映开放平台提供了视频编辑和处理的API服务。本文档介绍如何配置和调试剪映API。

## 官方资源

- **开放平台**: https://open.capcut.cn/
- **调试工具**: https://open.capcut.cn/debuggers
- **API文档**: https://open.capcut.cn/docs

## 配置步骤

### 1. 获取API密钥

1. 访问 https://open.capcut.cn/ 并注册/登录账号
2. 在开发者控制台创建应用
3. 获取 API Key 和 Secret Key

### 2. 配置环境变量

编辑 `.env` 文件，添加以下配置:

```env
CAPCUT_API_KEY=your_api_key_here
CAPCUT_SECRET_KEY=your_secret_key_here
CAPCUT_API_BASE_URL=https://open.capcut.cn
CAPCUT_DEBUG_MODE=true
```

### 3. 测试连接

运行测试脚本:

```bash
npm run test:capcut
```

## API使用示例

### 获取访问令牌

```javascript
import { CapCutClient } from './debuggers/capcut/client.js';

const client = new CapCutClient();
const token = await client.getAccessToken();
console.log('Access Token:', token);
```

### 创建编辑任务

```javascript
const taskConfig = {
  template_id: 'your_template_id',
  materials: [
    {
      type: 'video',
      url: 'https://example.com/video.mp4'
    }
  ]
};

const result = await client.createTask(taskConfig);
console.log('Task ID:', result.task_id);
```

### 查询任务状态

```javascript
const taskId = 'your_task_id';
const status = await client.queryTask(taskId);
console.log('Task Status:', status);
```

### 等待任务完成

```javascript
const result = await client.waitForTask(taskId);
console.log('Task Result:', result);
```

## HTTP API端点

服务器启动后，可以通过以下HTTP端点调用剪映API:

### 测试连接

```bash
curl -X POST http://localhost:3000/api/capcut/test
```

### 创建任务

```bash
curl -X POST http://localhost:3000/api/capcut/task \
  -H "Content-Type: application/json" \
  -d '{
    "template_id": "your_template_id",
    "materials": []
  }'
```

### 查询任务

```bash
curl http://localhost:3000/api/capcut/task/{task_id}
```

## 常见功能

### 视频编辑

剪映API支持以下视频编辑功能:
- 视频剪辑和合并
- 添加滤镜和特效
- 文字和贴纸
- 音乐和音效
- 转场效果

### 模板渲染

使用预设模板快速生成视频:
- 选择模板ID
- 上传素材
- 自动渲染
- 下载结果

## 调试工具

使用官方在线调试工具:
https://open.capcut.cn/debuggers

该工具提供:
- API接口测试
- 参数验证
- 响应预览
- 错误诊断

## 故障排除

### 认证失败

检查:
1. API Key 和 Secret Key 是否正确
2. 签名算法是否正确
3. 时间戳是否有效

### 任务失败

检查:
1. 素材URL是否可访问
2. 模板ID是否有效
3. 参数格式是否正确

### 超时问题

调整配置:
```javascript
timeout: 60000, // 增加超时时间
retryAttempts: 5, // 增加重试次数
```

## 注意事项

1. **配额限制**: 注意API调用配额和频率限制
2. **素材格式**: 确保素材符合API要求的格式和大小
3. **异步处理**: 视频处理是异步的，需要轮询查询结果
4. **错误处理**: 实现完善的错误处理和重试机制

## 更多资源

- [官方文档](https://open.capcut.cn/docs)
- [示例代码](../examples/capcut)
- [常见问题](https://open.capcut.cn/faq)
