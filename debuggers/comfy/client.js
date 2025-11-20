import axios from 'axios';
import { comfyConfig } from '../../config/comfy.js';
import { logger } from '../../utils/logger.js';

/**
 * Comfy云服务API客户端
 */
export class ComfyClient {
  constructor(config = comfyConfig) {
    this.config = config;

    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      }
    });

    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        if (this.config.debugMode) {
          logger.debug('Comfy Request:', {
            method: config.method,
            url: config.url,
            data: config.data
          });
        }
        return config;
      },
      (error) => {
        logger.error('Comfy Request Error:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => {
        if (this.config.debugMode) {
          logger.debug('Comfy Response:', {
            status: response.status,
            data: response.data
          });
        }
        return response;
      },
      (error) => {
        logger.error('Comfy Response Error:', {
          status: error.response?.status,
          data: error.response?.data
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * 提交工作流prompt
   */
  async submitPrompt(workflow) {
    try {
      logger.info('Submitting workflow to Comfy');

      const response = await this.client.post(this.config.endpoints.prompt, {
        prompt: workflow
      });

      if (response.data.prompt_id) {
        logger.info('Workflow submitted successfully:', response.data.prompt_id);
        return response.data;
      } else {
        throw new Error('Failed to get prompt_id from response');
      }
    } catch (error) {
      logger.error('Failed to submit prompt:', error);
      throw error;
    }
  }

  /**
   * 获取队列信息
   */
  async getQueue() {
    try {
      const response = await this.client.get(this.config.endpoints.queue);
      return response.data;
    } catch (error) {
      logger.error('Failed to get queue:', error);
      throw error;
    }
  }

  /**
   * 获取历史记录
   */
  async getHistory(promptId) {
    try {
      const endpoint = promptId
        ? `${this.config.endpoints.history}/${promptId}`
        : this.config.endpoints.history;

      const response = await this.client.get(endpoint);
      return response.data;
    } catch (error) {
      logger.error('Failed to get history:', error);
      throw error;
    }
  }

  /**
   * 轮询直到任务完成
   */
  async waitForCompletion(promptId) {
    logger.info(`Waiting for prompt ${promptId} to complete...`);

    for (let i = 0; i < this.config.maxPollAttempts; i++) {
      try {
        const history = await this.getHistory(promptId);

        if (history[promptId]) {
          logger.info(`Prompt ${promptId} completed successfully`);
          return history[promptId];
        }

        // 检查队列状态
        const queue = await this.getQueue();
        const isInQueue = queue.queue_running?.some(item => item.prompt_id === promptId) ||
                         queue.queue_pending?.some(item => item.prompt_id === promptId);

        if (!isInQueue && !history[promptId]) {
          throw new Error('Prompt not found in queue or history');
        }

        await new Promise(resolve => setTimeout(resolve, this.config.pollInterval));
      } catch (error) {
        logger.error('Error while waiting for completion:', error);
        throw error;
      }
    }

    throw new Error('Timeout waiting for prompt completion');
  }

  /**
   * 获取可用模型列表
   */
  async getModels() {
    try {
      const response = await this.client.get(this.config.endpoints.models);
      return response.data;
    } catch (error) {
      logger.error('Failed to get models:', error);
      throw error;
    }
  }

  /**
   * 上传图片
   */
  async uploadImage(imageData, filename) {
    try {
      const formData = new FormData();
      formData.append('image', imageData, filename);

      const response = await this.client.post(
        this.config.endpoints.upload,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      logger.info('Image uploaded successfully:', response.data);
      return response.data;
    } catch (error) {
      logger.error('Failed to upload image:', error);
      throw error;
    }
  }

  /**
   * 测试连接
   */
  async testConnection() {
    try {
      await this.getQueue();
      logger.info('Comfy connection test successful');
      return { success: true, message: 'Connection successful' };
    } catch (error) {
      logger.error('Comfy connection test failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 创建简单的文生图工作流
   */
  createTextToImageWorkflow(prompt, negativePrompt = '', width = 512, height = 512) {
    return {
      "3": {
        "inputs": {
          "seed": Math.floor(Math.random() * 1000000),
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
      "4": {
        "inputs": {
          "ckpt_name": "sd_xl_base_1.0.safetensors"
        },
        "class_type": "CheckpointLoaderSimple"
      },
      "5": {
        "inputs": {
          "width": width,
          "height": height,
          "batch_size": 1
        },
        "class_type": "EmptyLatentImage"
      },
      "6": {
        "inputs": {
          "text": prompt,
          "clip": ["4", 1]
        },
        "class_type": "CLIPTextEncode"
      },
      "7": {
        "inputs": {
          "text": negativePrompt,
          "clip": ["4", 1]
        },
        "class_type": "CLIPTextEncode"
      },
      "8": {
        "inputs": {
          "samples": ["3", 0],
          "vae": ["4", 2]
        },
        "class_type": "VAEDecode"
      },
      "9": {
        "inputs": {
          "filename_prefix": "ComfyUI",
          "images": ["8", 0]
        },
        "class_type": "SaveImage"
      }
    };
  }
}

export default ComfyClient;
