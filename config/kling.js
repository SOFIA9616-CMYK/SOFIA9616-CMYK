import dotenv from 'dotenv';
dotenv.config();

/**
 * 可灵AI视频生成配置
 * 可灵是国内的AI视频生成服务
 */
export const klingConfig = {
  // API密钥配置
  apiKey: process.env.KLING_API_KEY || '',
  accessToken: process.env.KLING_ACCESS_TOKEN || '',

  // API端点
  baseUrl: process.env.KLING_API_BASE_URL || 'https://api.klingai.com',

  // API端点
  endpoints: {
    // 视频生成
    videoGenerate: '/v1/videos/text2video',
    videoImage2video: '/v1/videos/image2video',

    // 任务查询
    taskQuery: '/v1/videos/task',

    // 图片生成
    imageGenerate: '/v1/images/generations',

    // 账户信息
    account: '/v1/account/info',
    balance: '/v1/account/balance'
  },

  // 请求配置
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,

  // 轮询配置（用于检查任务状态）
  pollInterval: 3000,
  maxPollAttempts: 200, // 10分钟超时

  // 调试模式
  debugMode: process.env.KLING_DEBUG_MODE === 'true',

  // 视频生成参数默认值
  defaults: {
    duration: 5, // 5秒或10秒
    aspectRatio: '16:9', // 16:9 或 9:16
    model: 'kling-v1', // 模型版本
    mode: 'std' // std（标准）或 pro（专业）
  }
};

export default klingConfig;
