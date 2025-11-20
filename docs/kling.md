# 可灵AI视频生成调试指南

## 简介

可灵（Kling）是国内领先的AI视频生成服务，支持文本生成视频和图片生成视频等功能。

## 配置步骤

### 1. 获取API密钥

1. 访问可灵官网并注册账号
2. 在开发者控制台获取API密钥和访问令牌

### 2. 配置环境变量

编辑 `.env` 文件:

```env
KLING_API_KEY=your_api_key_here
KLING_ACCESS_TOKEN=your_access_token_here
KLING_API_BASE_URL=https://api.klingai.com
KLING_DEBUG_MODE=true
```

### 3. 测试连接

```bash
npm run test:kling
```

## API使用示例

### 文本生成视频

```javascript
import { KlingClient } from './debuggers/kling/client.js';

const client = new KlingClient();

// 创建文本生成视频任务
const result = await client.text2video(
  '一只可爱的小猫在花园里玩耍，阳光明媚',
  {
    duration: 5,        // 5秒或10秒
    aspectRatio: '16:9', // 16:9 或 9:16
    mode: 'std'          // std（标准）或 pro（专业）
  }
);

console.log('Task ID:', result.taskId);

// 等待视频生成完成
const completed = await client.waitForTask(result.taskId);
console.log('Video URL:', completed.video_url);
```

### 图片生成视频

```javascript
const result = await client.image2video(
  'https://example.com/image.jpg',
  '让图片中的场景动起来，添加自然的动态效果',
  {
    duration: 5,
    mode: 'std'
  }
);

const completed = await client.waitForTask(result.taskId);
```

### 查询任务状态

```javascript
const taskId = 'your_task_id';
const status = await client.queryTask(taskId);

console.log('Status:', status.status);
console.log('Progress:', status.progress);

if (status.status === 'completed') {
  console.log('Video URL:', status.video_url);
}
```

### 文本生成图片

```javascript
const result = await client.generateImage(
  '一个未来主义的城市景观，赛博朋克风格',
  {
    aspectRatio: '1:1',
    negativePrompt: '低质量，模糊'
  }
);

const completed = await client.waitForTask(result.taskId);
console.log('Image URL:', completed.image_url);
```

### 获取账户信息

```javascript
// 获取账户基本信息
const accountInfo = await client.getAccountInfo();
console.log('Account:', accountInfo);

// 获取账户余额
const balance = await client.getBalance();
console.log('Balance:', balance);
```

## HTTP API端点

### 测试连接

```bash
curl -X POST http://localhost:3000/api/kling/test
```

### 文本生成视频

```bash
curl -X POST http://localhost:3000/api/kling/text2video \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "一只可爱的小猫在花园里玩耍",
    "duration": 5,
    "aspectRatio": "16:9",
    "mode": "std"
  }'
```

### 图片生成视频

```bash
curl -X POST http://localhost:3000/api/kling/image2video \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/image.jpg",
    "prompt": "让场景动起来",
    "duration": 5
  }'
```

### 查询任务

```bash
curl http://localhost:3000/api/kling/task/{task_id}
```

### 查询账户信息

```bash
# 账户信息
curl http://localhost:3000/api/kling/account

# 余额信息
curl http://localhost:3000/api/kling/balance
```

## 参数说明

### 视频生成参数

| 参数 | 类型 | 说明 | 可选值 |
|------|------|------|--------|
| prompt | string | 提示词描述 | 必填 |
| negativePrompt | string | 负面提示词 | 可选 |
| duration | number | 视频时长（秒） | 5, 10 |
| aspectRatio | string | 视频比例 | '16:9', '9:16' |
| mode | string | 生成模式 | 'std', 'pro' |
| model | string | 模型版本 | 'kling-v1' |

### 图片生成参数

| 参数 | 类型 | 说明 | 可选值 |
|------|------|------|--------|
| prompt | string | 提示词描述 | 必填 |
| negativePrompt | string | 负面提示词 | 可选 |
| aspectRatio | string | 图片比例 | '1:1', '16:9', '9:16' |

## 任务状态

- **pending**: 任务排队中
- **processing**: 正在生成
- **completed** / **success**: 生成完成
- **failed** / **error**: 生成失败

## 提示词最佳实践

### 文本生成视频

好的提示词示例:
```
一只可爱的橘色小猫在阳光明媚的花园里追逐蝴蝶，
镜头缓慢推进，背景有五颜六色的花朵，温馨治愈的氛围
```

提示词要点:
1. **描述主体**: 清楚说明主要对象
2. **动作描述**: 说明想要的动作和运动
3. **环境描述**: 描述场景和背景
4. **镜头语言**: 可以加入镜头运动描述
5. **风格氛围**: 说明期望的视觉风格

### 负面提示词

常用负面提示词:
```
低质量, 模糊, 变形, 画面抖动, 闪烁, 水印
```

### 图片生成视频

提示词示例:
```
让画面中的人物自然转头微笑，
背景的云彩缓慢飘动，
添加自然的动态效果，
保持画面稳定流畅
```

## 性能优化

### 1. 选择合适的模式

```javascript
mode: 'std'  // 标准模式 - 更快，适合测试
mode: 'pro'  // 专业模式 - 质量更高，速度较慢
```

### 2. 合理设置时长

```javascript
duration: 5   // 5秒 - 快速生成
duration: 10  // 10秒 - 需要更多时间
```

### 3. 批量处理

如果有多个任务，并行提交:
```javascript
const tasks = await Promise.all([
  client.text2video(prompt1),
  client.text2video(prompt2),
  client.text2video(prompt3)
]);

// 然后等待所有任务完成
const results = await Promise.all(
  tasks.map(task => client.waitForTask(task.taskId))
);
```

## 故障排除

### 认证失败

检查:
1. API Key 是否正确
2. Access Token 是否有效
3. 是否有足够的配额

### 任务失败

常见原因:
1. 提示词包含敏感内容
2. 图片URL无法访问（image2video）
3. 参数格式错误
4. 账户余额不足

### 超时问题

调整配置:
```javascript
pollInterval: 5000,      // 增加轮询间隔
maxPollAttempts: 300,    // 增加最大尝试次数
```

## 成本管理

### 查看消费

```javascript
const balance = await client.getBalance();
console.log('剩余配额:', balance);
```

### 成本优化建议

1. **测试时使用标准模式**: `mode: 'std'`
2. **选择较短时长**: `duration: 5`
3. **优化提示词**: 减少重试次数
4. **批量处理**: 提高效率

## 注意事项

1. **内容审核**: 提示词会经过内容审核
2. **配额限制**: 注意账户配额和调用频率
3. **异步处理**: 视频生成是异步的，需要轮询
4. **质量vs速度**: 专业模式质量更高但速度较慢
5. **提示词质量**: 好的提示词能显著提高生成质量

## 示例代码

完整示例请查看:
- [基础示例](../examples/kling/basic.js)
- [批量处理](../examples/kling/batch.js)
- [高级用法](../examples/kling/advanced.js)

## 更多资源

- [可灵官方文档](https://docs.klingai.com/)
- [提示词指南](https://docs.klingai.com/prompt-guide)
- [社区示例](https://community.klingai.com/)
