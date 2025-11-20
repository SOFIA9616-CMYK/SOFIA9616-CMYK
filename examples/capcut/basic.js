import { CapCutClient } from '../../debuggers/capcut/client.js';
import { logger } from '../../utils/logger.js';

/**
 * 剪映基础使用示例
 */
async function basicExample() {
  const client = new CapCutClient();

  try {
    // 1. 测试连接
    logger.info('测试连接...');
    const testResult = await client.testConnection();
    logger.info('连接测试结果:', testResult);

    // 2. 获取访问令牌
    logger.info('\n获取访问令牌...');
    const token = await client.getAccessToken();
    logger.info('访问令牌获取成功');

    // 3. 创建简单的编辑任务（示例）
    logger.info('\n创建编辑任务...');
    /*
    const taskConfig = {
      template_id: 'your_template_id',
      materials: [
        {
          type: 'video',
          url: 'https://example.com/video.mp4',
          duration: 10
        },
        {
          type: 'image',
          url: 'https://example.com/image.jpg',
          duration: 3
        }
      ],
      params: {
        title: '我的视频',
        music_id: 'optional_music_id'
      }
    };

    const taskResult = await client.createTask(taskConfig);
    logger.info('任务创建成功:', taskResult.task_id);

    // 4. 等待任务完成
    logger.info('\n等待任务完成...');
    const result = await client.waitForTask(taskResult.task_id);
    logger.info('任务完成!');
    logger.info('结果视频URL:', result.video_url);
    */

    logger.info('\n示例完成!');
    logger.info('注意: 取消注释上面的代码以实际创建任务');

  } catch (error) {
    logger.error('错误:', error.message);
  }
}

// 运行示例
basicExample();
