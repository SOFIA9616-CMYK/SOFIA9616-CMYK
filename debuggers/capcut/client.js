import axios from 'axios';
import crypto from 'crypto';
import { capcutConfig } from '../../config/capcut.js';
import { logger } from '../../utils/logger.js';

/**
 * 剪映（CapCut）API客户端
 */
export class CapCutClient {
  constructor(config = capcutConfig) {
    this.config = config;
    this.accessToken = null;
    this.tokenExpiry = null;

    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // 请求拦截器
    this.client.interceptors.request.use(
      async (config) => {
        // 自动添加token
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }

        if (this.config.debugMode) {
          logger.debug('CapCut Request:', {
            method: config.method,
            url: config.url,
            data: config.data
          });
        }

        return config;
      },
      (error) => {
        logger.error('CapCut Request Error:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => {
        if (this.config.debugMode) {
          logger.debug('CapCut Response:', {
            status: response.status,
            data: response.data
          });
        }
        return response;
      },
      (error) => {
        logger.error('CapCut Response Error:', {
          status: error.response?.status,
          data: error.response?.data
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * 生成签名
   */
  generateSignature(params, timestamp) {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');

    const signString = `${sortedParams}&timestamp=${timestamp}&secret=${this.config.secretKey}`;
    return crypto.createHash('sha256').update(signString).digest('hex');
  }

  /**
   * 获取访问令牌
   */
  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const timestamp = Date.now();
      const params = {
        api_key: this.config.apiKey,
        timestamp: timestamp,
      };

      const signature = this.generateSignature(params, timestamp);

      const response = await this.client.post(this.config.endpoints.auth, {
        ...params,
        signature
      });

      if (response.data.code === 0) {
        this.accessToken = response.data.data.access_token;
        this.tokenExpiry = Date.now() + (response.data.data.expires_in * 1000);
        logger.info('CapCut access token obtained successfully');
        return this.accessToken;
      } else {
        throw new Error(`Failed to get access token: ${response.data.message}`);
      }
    } catch (error) {
      logger.error('Failed to get CapCut access token:', error);
      throw error;
    }
  }

  /**
   * 上传素材
   */
  async uploadMaterial(filePath, materialType = 'video') {
    await this.getAccessToken();

    try {
      // 这里需要实际的文件上传逻辑
      logger.info(`Uploading material: ${filePath}`);

      const response = await this.client.post(this.config.endpoints.upload, {
        material_type: materialType,
        // 实际文件数据需要根据API文档处理
      });

      return response.data;
    } catch (error) {
      logger.error('Failed to upload material:', error);
      throw error;
    }
  }

  /**
   * 创建编辑任务
   */
  async createTask(taskConfig) {
    await this.getAccessToken();

    try {
      logger.info('Creating CapCut task:', taskConfig);

      const response = await this.client.post(this.config.endpoints.task, taskConfig);

      if (response.data.code === 0) {
        logger.info('Task created successfully:', response.data.data.task_id);
        return response.data.data;
      } else {
        throw new Error(`Failed to create task: ${response.data.message}`);
      }
    } catch (error) {
      logger.error('Failed to create task:', error);
      throw error;
    }
  }

  /**
   * 查询任务状态
   */
  async queryTask(taskId) {
    await this.getAccessToken();

    try {
      const response = await this.client.get(`${this.config.endpoints.query}/${taskId}`);

      if (response.data.code === 0) {
        return response.data.data;
      } else {
        throw new Error(`Failed to query task: ${response.data.message}`);
      }
    } catch (error) {
      logger.error('Failed to query task:', error);
      throw error;
    }
  }

  /**
   * 轮询任务直到完成
   */
  async waitForTask(taskId, maxAttempts = 60, interval = 5000) {
    for (let i = 0; i < maxAttempts; i++) {
      const taskStatus = await this.queryTask(taskId);

      logger.info(`Task ${taskId} status: ${taskStatus.status}`);

      if (taskStatus.status === 'completed') {
        return taskStatus;
      } else if (taskStatus.status === 'failed') {
        throw new Error(`Task failed: ${taskStatus.error}`);
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error('Task timeout');
  }

  /**
   * 测试连接
   */
  async testConnection() {
    try {
      await this.getAccessToken();
      logger.info('CapCut connection test successful');
      return { success: true, message: 'Connection successful' };
    } catch (error) {
      logger.error('CapCut connection test failed:', error);
      return { success: false, error: error.message };
    }
  }
}

export default CapCutClient;
