import dotenv from 'dotenv';
dotenv.config();

/**
 * Comfy云服务配置
 * 文档：https://docs.comfy.org/
 */
export const comfyConfig = {
  // API密钥配置
  apiKey: process.env.COMFY_API_KEY || '',

  // API端点
  baseUrl: process.env.COMFY_API_BASE_URL || 'https://cloud.comfy.org',

  // API端点
  endpoints: {
    queue: '/api/queue',
    history: '/api/history',
    prompt: '/api/prompt',
    view: '/api/view',
    upload: '/api/upload/image',
    models: '/api/models'
  },

  // WebSocket配置（用于实时状态更新）
  wsUrl: 'wss://cloud.comfy.org/ws',

  // 请求配置
  timeout: parseInt(process.env.COMFY_TIMEOUT) || 60000,
  retryAttempts: 3,
  retryDelay: 2000,

  // 轮询配置
  pollInterval: 2000,
  maxPollAttempts: 150, // 5分钟超时（2秒 x 150）

  // 调试模式
  debugMode: process.env.NODE_ENV === 'development'
};

export default comfyConfig;
