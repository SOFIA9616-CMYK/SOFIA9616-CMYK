import { CapCutClient } from './client.js';
import { logger } from '../../utils/logger.js';

/**
 * 剪映（CapCut）调试测试
 */
async function testCapCut() {
  logger.info('=== 开始测试剪映（CapCut）API ===');

  const client = new CapCutClient();

  try {
    // 测试1: 连接测试
    logger.info('\n[测试1] 连接测试');
    const connectionResult = await client.testConnection();
    if (!connectionResult.success) {
      throw new Error('Connection test failed');
    }
    logger.info('✓ 连接测试通过');

    // 测试2: 获取访问令牌
    logger.info('\n[测试2] 获取访问令牌');
    const token = await client.getAccessToken();
    logger.info('✓ 成功获取访问令牌:', token.substring(0, 20) + '...');

    // 测试3: 创建测试任务（需要根据实际API调整）
    logger.info('\n[测试3] 创建测试任务');
    // const taskResult = await client.createTask({
    //   template_id: 'test_template',
    //   materials: []
    // });
    // logger.info('✓ 任务创建成功:', taskResult.task_id);

    logger.info('\n=== 剪映（CapCut）API 测试完成 ===');
    logger.info('所有测试通过！');

  } catch (error) {
    logger.error('\n=== 测试失败 ===');
    logger.error('错误信息:', error.message);
    process.exit(1);
  }
}

// 运行测试
testCapCut();
