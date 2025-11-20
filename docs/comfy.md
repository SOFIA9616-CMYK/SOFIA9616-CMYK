# Comfy云服务调试指南

## 简介

ComfyUI是一个强大的Stable Diffusion工作流工具，Comfy云服务提供了云端ComfyUI API。

## 官方资源

- **服务地址**: https://cloud.comfy.org/
- **文档**: https://docs.comfy.org/
- **GitHub**: https://github.com/comfyanonymous/ComfyUI

## 配置步骤

### 1. 获取API密钥

1. 访问 https://cloud.comfy.org/ 并注册账号
2. 在账户设置中获取 API Key

### 2. 配置环境变量

编辑 `.env` 文件:

```env
COMFY_API_KEY=your_api_key_here
COMFY_API_BASE_URL=https://cloud.comfy.org
COMFY_TIMEOUT=60000
```

### 3. 测试连接

```bash
npm run test:comfy
```

## API使用示例

### 提交工作流

```javascript
import { ComfyClient } from './debuggers/comfy/client.js';

const client = new ComfyClient();

// 使用预设的文生图工作流
const workflow = client.createTextToImageWorkflow(
  'a beautiful landscape, mountains, sunset',
  'blurry, low quality',
  512,
  512
);

const result = await client.submitPrompt(workflow);
console.log('Prompt ID:', result.prompt_id);
```

### 查询队列状态

```javascript
const queue = await client.getQueue();
console.log('Running:', queue.queue_running);
console.log('Pending:', queue.queue_pending);
```

### 等待任务完成

```javascript
const completed = await client.waitForCompletion(result.prompt_id);
console.log('Result:', completed);
```

### 自定义工作流

```javascript
const customWorkflow = {
  "3": {
    "inputs": {
      "seed": 12345,
      "steps": 20,
      "cfg": 7,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": ["4", 0],
      "positive": ["6", 0],
      "negative": ["7", 0],
      "latent_image": ["5", 0]
    },
    "class_type": "KSampler"
  },
  // ... 更多节点
};

await client.submitPrompt(customWorkflow);
```

## HTTP API端点

### 测试连接

```bash
curl -X POST http://localhost:3000/api/comfy/test
```

### 提交工作流

```bash
curl -X POST http://localhost:3000/api/comfy/prompt \
  -H "Content-Type: application/json" \
  -d '{
    "workflow": { ... }
  }'
```

### 查询队列

```bash
curl http://localhost:3000/api/comfy/queue
```

### 查询历史

```bash
# 所有历史
curl http://localhost:3000/api/comfy/history

# 特定prompt的历史
curl http://localhost:3000/api/comfy/history/{prompt_id}
```

## ComfyUI工作流概念

### 节点类型

常用节点:
- **CheckpointLoaderSimple**: 加载模型
- **CLIPTextEncode**: 文本编码（prompt/negative prompt）
- **KSampler**: 采样器
- **VAEDecode**: VAE解码
- **SaveImage**: 保存图片
- **EmptyLatentImage**: 创建空白latent

### 工作流结构

```javascript
{
  "节点ID": {
    "inputs": {
      "参数名": "参数值",
      "连接参数": ["源节点ID", 输出索引]
    },
    "class_type": "节点类型"
  }
}
```

## 常见功能

### 文生图 (Text-to-Image)

```javascript
const workflow = client.createTextToImageWorkflow(
  'positive prompt',
  'negative prompt',
  width,
  height
);
```

### 图生图 (Image-to-Image)

需要先上传图片，然后在工作流中引用。

### ControlNet

添加ControlNet节点实现精确控制。

### LoRA

在CheckpointLoader后添加LoraLoader节点。

## WebSocket实时更新

```javascript
import WebSocket from 'ws';

const ws = new WebSocket('wss://cloud.comfy.org/ws');

ws.on('message', (data) => {
  const message = JSON.parse(data);
  console.log('Progress:', message);
});
```

## 故障排除

### API密钥无效

检查:
1. API密钥是否正确
2. API密钥是否有效期内
3. 是否有足够的配额

### 工作流执行失败

检查:
1. 节点连接是否正确
2. 模型名称是否存在
3. 参数值是否有效

### 超时问题

```env
COMFY_TIMEOUT=120000  # 增加到2分钟
```

## 性能优化

### 1. 使用合适的采样器

```javascript
sampler_name: "euler_a"  // 快速
sampler_name: "dpm_2"    // 质量更好但较慢
```

### 2. 调整步数

```javascript
steps: 20  // 标准
steps: 30  // 更高质量
steps: 15  // 更快速度
```

### 3. 批量处理

在workflow中设置batch_size。

## 注意事项

1. **异步处理**: 所有任务都是异步的
2. **配额管理**: 注意API调用配额
3. **模型可用性**: 确认云端有你需要的模型
4. **网络稳定性**: 大型工作流可能需要较长时间

## 更多资源

- [ComfyUI官方文档](https://docs.comfy.org/)
- [工作流示例](../examples/comfy)
- [社区工作流](https://comfyworkflows.com/)
