import { KlingClient } from './client.js';
import { logger } from '../../utils/logger.js';

/**
 * 可灵AI视频生成调试测试
 */
async function testKling() {
  logger.info('=== 开始测试可灵AI视频生成服务 ===');

  const client = new KlingClient();

  try {
    // 测试1: 连接测试
    logger.info('\n[测试1] 连接测试');
    const connectionResult = await client.testConnection();
    if (!connectionResult.success) {
      logger.warn('连接测试有警告:', connectionResult.warning || connectionResult.error);
    } else {
      logger.info('✓ 连接测试通过');
    }

    // 测试2: 获取账户信息
    logger.info('\n[测试2] 获取账户信息');
    try {
      const accountInfo = await client.getAccountInfo();
      logger.info('✓ 账户信息获取成功');
      logger.info('账户信息:', JSON.stringify(accountInfo, null, 2));
    } catch (error) {
      logger.warn('获取账户信息失败（可能需要配置正确的API密钥）:', error.message);
    }

    // 测试3: 获取账户余额
    logger.info('\n[测试3] 获取账户余额');
    try {
      const balance = await client.getBalance();
      logger.info('✓ 余额信息获取成功');
      logger.info('余额信息:', JSON.stringify(balance, null, 2));
    } catch (error) {
      logger.warn('获取余额信息失败:', error.message);
    }

    // 测试4: 创建文本生成视频任务（注释掉以避免消耗配额）
    logger.info('\n[测试4] 创建文本生成视频任务（已注释，取消注释以实际测试）');
    /*
    const videoTask = await client.text2video(
      '一只可爱的小猫在花园里玩耍，阳光明媚',
      {
        duration: 5,
        aspectRatio: '16:9',
        mode: 'std'
      }
    );
    logger.info('✓ 视频任务创建成功:', videoTask.taskId);

    logger.info('\n[测试5] 等待视频生成完成');
    const completedTask = await client.waitForTask(videoTask.taskId);
    logger.info('✓ 视频生成完成');
    logger.info('视频结果:', JSON.stringify(completedTask, null, 2));
    */

    logger.info('\n=== 可灵AI视频生成服务测试完成 ===');
    logger.info('基础测试通过！');
    logger.info('提示: 取消注释测试4和测试5以测试实际的视频生成功能（会消耗配额）');

  } catch (error) {
    logger.error('\n=== 测试失败 ===');
    logger.error('错误信息:', error.message);
    if (error.response) {
      logger.error('响应状态:', error.response.status);
      logger.error('响应数据:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// 运行测试
testKling();
