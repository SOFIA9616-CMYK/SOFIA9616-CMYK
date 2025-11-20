import dotenv from 'dotenv';
dotenv.config();

/**
 * 剪映（CapCut）开放平台配置
 * 文档：https://open.capcut.cn/docs
 */
export const capcutConfig = {
  // API密钥配置
  apiKey: process.env.CAPCUT_API_KEY || '',
  secretKey: process.env.CAPCUT_SECRET_KEY || '',

  // API端点
  baseUrl: process.env.CAPCUT_API_BASE_URL || 'https://open.capcut.cn',

  // 调试工具URL
  debuggerUrl: 'https://open.capcut.cn/debuggers',

  // API端点
  endpoints: {
    auth: '/v1/oauth/token',
    upload: '/v1/material/upload',
    task: '/v1/task',
    query: '/v1/task/query',
    download: '/v1/material/download'
  },

  // 请求配置
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,

  // 调试模式
  debugMode: process.env.CAPCUT_DEBUG_MODE === 'true',

  // 支持的功能
  features: {
    videoEdit: true,
    templateRender: true,
    materialUpload: true,
    taskManagement: true
  }
};

export default capcutConfig;
