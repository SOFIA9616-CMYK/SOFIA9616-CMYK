import { KlingClient } from '../../debuggers/kling/client.js';
import { logger } from '../../utils/logger.js';

/**
 * 可灵基础使用示例
 */
async function basicExample() {
  const client = new KlingClient();

  try {
    // 1. 测试连接
    logger.info('测试连接...');
    const testResult = await client.testConnection();
    logger.info('连接测试结果:', testResult);

    // 2. 查看账户信息
    logger.info('\n查看账户信息...');
    try {
      const accountInfo = await client.getAccountInfo();
      logger.info('账户信息:', accountInfo);

      const balance = await client.getBalance();
      logger.info('账户余额:', balance);
    } catch (error) {
      logger.warn('获取账户信息失败（可能需要配置API密钥）:', error.message);
    }

    // 3. 文本生成视频示例（取消注释以实际运行）
    logger.info('\n文本生成视频示例（已注释）');
    /*
    const prompt = '一只可爱的橘色小猫在阳光明媚的花园里追逐蝴蝶，镜头缓慢推进，背景有五颜六色的花朵';

    logger.info('创建视频生成任务...');
    const task = await client.text2video(prompt, {
      duration: 5,
      aspectRatio: '16:9',
      mode: 'std'
    });

    logger.info('任务创建成功:', task.taskId);

    logger.info('\n等待视频生成...');
    const result = await client.waitForTask(task.taskId);

    logger.info('视频生成完成!');
    logger.info('视频URL:', result.video_url);
    */

    // 4. 图片生成视频示例
    logger.info('\n图片生成视频示例（已注释）');
    /*
    const imageUrl = 'https://example.com/your-image.jpg';
    const imagePrompt = '让画面中的场景自然动起来，添加轻微的镜头运动';

    const imageTask = await client.image2video(imageUrl, imagePrompt, {
      duration: 5,
      mode: 'std'
    });

    logger.info('图片转视频任务创建成功:', imageTask.taskId);

    const imageResult = await client.waitForTask(imageTask.taskId);
    logger.info('视频URL:', imageResult.video_url);
    */

    logger.info('\n示例完成!');
    logger.info('注意: 取消注释上面的代码以实际生成视频（会消耗配额）');

  } catch (error) {
    logger.error('错误:', error.message);
    if (error.response) {
      logger.error('响应数据:', error.response.data);
    }
  }
}

// 运行示例
basicExample();
