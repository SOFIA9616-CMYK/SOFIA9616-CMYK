import express from 'express';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import { CapCutClient } from './debuggers/capcut/client.js';
import { ComfyClient } from './debuggers/comfy/client.js';
import { KlingClient } from './debuggers/kling/client.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(express.json());

// 初始化客户端
const capcutClient = new CapCutClient();
const comfyClient = new ComfyClient();
const klingClient = new KlingClient();

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      capcut: 'available',
      comfy: 'available',
      kling: 'available'
    }
  });
});

// 剪映相关端点
app.post('/api/capcut/test', async (req, res) => {
  try {
    const result = await capcutClient.testConnection();
    res.json(result);
  } catch (error) {
    logger.error('CapCut test failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/capcut/task', async (req, res) => {
  try {
    const result = await capcutClient.createTask(req.body);
    res.json(result);
  } catch (error) {
    logger.error('Failed to create CapCut task:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/capcut/task/:taskId', async (req, res) => {
  try {
    const result = await capcutClient.queryTask(req.params.taskId);
    res.json(result);
  } catch (error) {
    logger.error('Failed to query CapCut task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Comfy相关端点
app.post('/api/comfy/test', async (req, res) => {
  try {
    const result = await comfyClient.testConnection();
    res.json(result);
  } catch (error) {
    logger.error('Comfy test failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/comfy/prompt', async (req, res) => {
  try {
    const result = await comfyClient.submitPrompt(req.body.workflow);
    res.json(result);
  } catch (error) {
    logger.error('Failed to submit Comfy prompt:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/comfy/queue', async (req, res) => {
  try {
    const result = await comfyClient.getQueue();
    res.json(result);
  } catch (error) {
    logger.error('Failed to get Comfy queue:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/comfy/history/:promptId?', async (req, res) => {
  try {
    const result = await comfyClient.getHistory(req.params.promptId);
    res.json(result);
  } catch (error) {
    logger.error('Failed to get Comfy history:', error);
    res.status(500).json({ error: error.message });
  }
});

// 可灵相关端点
app.post('/api/kling/test', async (req, res) => {
  try {
    const result = await klingClient.testConnection();
    res.json(result);
  } catch (error) {
    logger.error('Kling test failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/kling/text2video', async (req, res) => {
  try {
    const { prompt, ...options } = req.body;
    const result = await klingClient.text2video(prompt, options);
    res.json(result);
  } catch (error) {
    logger.error('Failed to create Kling text2video task:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/kling/image2video', async (req, res) => {
  try {
    const { imageUrl, prompt, ...options } = req.body;
    const result = await klingClient.image2video(imageUrl, prompt, options);
    res.json(result);
  } catch (error) {
    logger.error('Failed to create Kling image2video task:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/kling/task/:taskId', async (req, res) => {
  try {
    const result = await klingClient.queryTask(req.params.taskId);
    res.json(result);
  } catch (error) {
    logger.error('Failed to query Kling task:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/kling/account', async (req, res) => {
  try {
    const result = await klingClient.getAccountInfo();
    res.json(result);
  } catch (error) {
    logger.error('Failed to get Kling account info:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/kling/balance', async (req, res) => {
  try {
    const result = await klingClient.getBalance();
    res.json(result);
  } catch (error) {
    logger.error('Failed to get Kling balance:', error);
    res.status(500).json({ error: error.message });
  }
});

// 一次性测试所有服务
app.post('/api/test-all', async (req, res) => {
  logger.info('Testing all services...');

  const results = {
    capcut: null,
    comfy: null,
    kling: null
  };

  try {
    results.capcut = await capcutClient.testConnection();
  } catch (error) {
    results.capcut = { success: false, error: error.message };
  }

  try {
    results.comfy = await comfyClient.testConnection();
  } catch (error) {
    results.comfy = { success: false, error: error.message };
  }

  try {
    results.kling = await klingClient.testConnection();
  } catch (error) {
    results.kling = { success: false, error: error.message };
  }

  const allSuccess = Object.values(results).every(r => r.success);
  const statusCode = allSuccess ? 200 : 207; // 207 = Multi-Status

  res.status(statusCode).json({
    success: allSuccess,
    results: results,
    timestamp: new Date().toISOString()
  });
});

// 根路径 - 显示API文档
app.get('/', (req, res) => {
  res.json({
    name: 'AI视频后端调试服务',
    version: '1.0.0',
    services: {
      capcut: {
        name: '剪映（CapCut）',
        debugger: 'https://open.capcut.cn/debuggers',
        endpoints: [
          'POST /api/capcut/test',
          'POST /api/capcut/task',
          'GET /api/capcut/task/:taskId'
        ]
      },
      comfy: {
        name: 'Comfy云服务',
        url: 'https://cloud.comfy.org',
        endpoints: [
          'POST /api/comfy/test',
          'POST /api/comfy/prompt',
          'GET /api/comfy/queue',
          'GET /api/comfy/history/:promptId?'
        ]
      },
      kling: {
        name: '可灵AI',
        endpoints: [
          'POST /api/kling/test',
          'POST /api/kling/text2video',
          'POST /api/kling/image2video',
          'GET /api/kling/task/:taskId',
          'GET /api/kling/account',
          'GET /api/kling/balance'
        ]
      }
    },
    endpoints: {
      health: 'GET /health',
      testAll: 'POST /api/test-all'
    }
  });
});

// 启动服务器
app.listen(port, () => {
  logger.info(`🚀 服务器已启动！`);
  logger.info(`📍 监听地址: http://localhost:${port}`);
  logger.info(`🔧 环境: ${process.env.NODE_ENV || 'development'}`);
  logger.info('');
  logger.info('支持的服务:');
  logger.info('  ✓ 剪映（CapCut）- https://open.capcut.cn/debuggers');
  logger.info('  ✓ Comfy云服务 - https://cloud.comfy.org');
  logger.info('  ✓ 可灵AI视频生成');
  logger.info('');
  logger.info('快速测试: POST http://localhost:' + port + '/api/test-all');
});

export default app;
