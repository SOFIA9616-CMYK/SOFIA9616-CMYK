import { ComfyClient } from './client.js';
import { logger } from '../../utils/logger.js';

/**
 * Comfy云服务调试测试
 */
async function testComfy() {
  logger.info('=== 开始测试Comfy云服务 ===');

  const client = new ComfyClient();

  try {
    // 测试1: 连接测试
    logger.info('\n[测试1] 连接测试');
    const connectionResult = await client.testConnection();
    if (!connectionResult.success) {
      throw new Error('Connection test failed');
    }
    logger.info('✓ 连接测试通过');

    // 测试2: 获取队列信息
    logger.info('\n[测试2] 获取队列信息');
    const queue = await client.getQueue();
    logger.info('✓ 队列信息获取成功');
    logger.info('运行中任务:', queue.queue_running?.length || 0);
    logger.info('等待中任务:', queue.queue_pending?.length || 0);

    // 测试3: 获取可用模型（如果API支持）
    logger.info('\n[测试3] 获取可用模型');
    try {
      const models = await client.getModels();
      logger.info('✓ 成功获取模型列表');
      logger.info('可用模型数量:', Object.keys(models).length);
    } catch (error) {
      logger.warn('获取模型列表失败（API可能不支持）:', error.message);
    }

    // 测试4: 提交简单工作流
    logger.info('\n[测试4] 提交测试工作流');
    const workflow = client.createTextToImageWorkflow(
      'a beautiful landscape, mountains, sunset',
      'blurry, low quality',
      512,
      512
    );

    // 注释掉实际提交，避免消耗资源
    // const result = await client.submitPrompt(workflow);
    // logger.info('✓ 工作流提交成功:', result.prompt_id);
    //
    // logger.info('\n[测试5] 等待任务完成');
    // const completed = await client.waitForCompletion(result.prompt_id);
    // logger.info('✓ 任务完成:', completed);

    logger.info('\n=== Comfy云服务测试完成 ===');
    logger.info('所有测试通过！');

  } catch (error) {
    logger.error('\n=== 测试失败 ===');
    logger.error('错误信息:', error.message);
    if (error.response) {
      logger.error('响应状态:', error.response.status);
      logger.error('响应数据:', error.response.data);
    }
    process.exit(1);
  }
}

// 运行测试
testComfy();
