#!/bin/bash

# Gemini CLI 测试脚本
# 这个脚本演示Gemini CLI的各种功能

echo "========================================="
echo "  Gemini CLI 功能测试"
echo "========================================="
echo ""

# 检查安装
echo "1. 检查Gemini CLI安装..."
if command -v gemini &> /dev/null; then
    echo "   ✓ Gemini CLI 已安装"
    echo "   版本: $(gemini --version)"
    echo "   位置: $(which gemini)"
else
    echo "   ✗ Gemini CLI 未安装"
    exit 1
fi

echo ""
echo "2. 查看可用扩展..."
gemini --list-extensions

echo ""
echo "========================================="
echo "  使用示例"
echo "========================================="
echo ""

cat << 'EOF'
基础用法示例:

# 1. 启动交互式对话
gemini

# 2. 快速提问（单次对话）
gemini "What is Node.js?"

# 3. 代码解释
gemini "Explain this code" < server.js

# 4. 代码生成
gemini "Write a Python function to sort a list"

# 5. 使用Google搜索
gemini "Latest news about AI in 2025" --extensions google_search

# 6. 执行shell命令（需要确认）
gemini "List all JavaScript files in current directory" --extensions shell

# 7. 分析文件
gemini "Summarize this README" < README.md

# 8. 继续之前的对话
gemini --resume latest

# 9. 查看对话历史
gemini --list-sessions

# 10. YOLO模式（自动批准所有操作，谨慎使用！）
gemini --yolo "Create a backup of important files"

---

更多高级功能:

# 处理多个文件
cat file1.js file2.js | gemini "Find bugs in this code"

# 使用特定模型
gemini --model gemini-2.0-flash "Quick question"

# JSON输出格式
gemini --output-format json "What is 2+2?"

# 调试模式
gemini --debug "Test query"

EOF

echo ""
echo "========================================="
echo "  快速测试"
echo "========================================="
echo ""
echo "注意: 首次使用需要登录Google账号"
echo "运行以下命令开始:"
echo ""
echo "  gemini"
echo ""
echo "或者快速测试（不需要登录也能看到提示）:"
echo ""
echo "  gemini \"Hello\""
echo ""
echo "========================================="
