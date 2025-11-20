import { ComfyClient } from '../../debuggers/comfy/client.js';
import { logger } from '../../utils/logger.js';

/**
 * Comfy基础使用示例
 */
async function basicExample() {
  const client = new ComfyClient();

  try {
    // 1. 测试连接
    logger.info('测试连接...');
    const testResult = await client.testConnection();
    logger.info('连接测试结果:', testResult);

    // 2. 查看队列状态
    logger.info('\n查看队列状态...');
    const queue = await client.getQueue();
    logger.info('运行中:', queue.queue_running?.length || 0);
    logger.info('等待中:', queue.queue_pending?.length || 0);

    // 3. 创建简单的文生图工作流
    logger.info('\n创建文生图工作流...');
    const workflow = client.createTextToImageWorkflow(
      'a beautiful landscape with mountains and a lake, sunset, highly detailed',
      'blurry, low quality, watermark',
      512,
      512
    );

    logger.info('工作流创建完成');
    logger.info('工作流节点数:', Object.keys(workflow).length);

    // 4. 提交工作流（取消注释以实际运行）
    /*
    logger.info('\n提交工作流...');
    const result = await client.submitPrompt(workflow);
    logger.info('提交成功, Prompt ID:', result.prompt_id);

    // 5. 等待完成
    logger.info('\n等待生成完成...');
    const completed = await client.waitForCompletion(result.prompt_id);
    logger.info('生成完成!');
    logger.info('结果:', completed);
    */

    logger.info('\n示例完成!');
    logger.info('注意: 取消注释上面的代码以实际提交工作流');

  } catch (error) {
    logger.error('错误:', error.message);
  }
}

// 运行示例
basicExample();
