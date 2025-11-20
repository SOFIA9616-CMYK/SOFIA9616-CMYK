#!/bin/bash

# Gemini Code Assist 安装脚本
# 用于通过VS Code CLI安装扩展

echo "========================================="
echo "  Gemini Code Assist 安装脚本"
echo "========================================="
echo ""

# 检查VS Code CLI
echo "1. 检查VS Code CLI..."

if command -v code &> /dev/null; then
    echo "   ✓ VS Code CLI 已安装"
    echo "   位置: $(which code)"
    echo ""

    echo "2. 安装Gemini Code Assist扩展..."
    code --install-extension GoogleCloudTools.gemini-code-assist

    echo ""
    echo "   ✓ 安装完成！"
    echo ""
    echo "下一步："
    echo "  1. 打开VS Code"
    echo "  2. 点击侧边栏的Gemini图标"
    echo "  3. 使用Google账号登录"
    echo "  4. 开始使用AI代码助手！"

elif command -v code-server &> /dev/null; then
    echo "   ✓ code-server 已安装"
    echo "   位置: $(which code-server)"
    echo ""

    echo "2. 安装Gemini Code Assist扩展..."
    code-server --install-extension GoogleCloudTools.gemini-code-assist

    echo ""
    echo "   ✓ 安装完成！"
    echo ""
    echo "下一步："
    echo "  1. 打开code-server"
    echo "  2. 点击侧边栏的Gemini图标"
    echo "  3. 使用Google账号登录"

else
    echo "   ✗ VS Code CLI 未找到"
    echo ""
    echo "========================================="
    echo "  手动安装说明"
    echo "========================================="
    echo ""
    echo "请选择以下方法之一："
    echo ""
    echo "方法1: 在VS Code中手动安装"
    echo "  1. 打开VS Code"
    echo "  2. 按 Ctrl+Shift+X (Windows/Linux) 或 Cmd+Shift+X (Mac)"
    echo "  3. 搜索: Gemini Code Assist"
    echo "  4. 点击 Install"
    echo ""
    echo "方法2: 通过Remote SSH安装"
    echo "  1. 在本地VS Code中安装Remote-SSH扩展"
    echo "  2. 连接到这台服务器"
    echo "  3. 在远程连接中打开扩展面板"
    echo "  4. 搜索并安装 Gemini Code Assist"
    echo ""
    echo "方法3: 安装VS Code CLI"
    echo "  访问: https://code.visualstudio.com/"
    echo "  下载并安装VS Code"
    echo "  然后重新运行此脚本"
    echo ""
fi

echo ""
echo "========================================="
echo "  功能特性"
echo "========================================="
echo ""
echo "安装后你将获得:"
echo "  ✓ AI代码自动补全"
echo "  ✓ 智能代码建议"
echo "  ✓ AI聊天助手"
echo "  ✓ 代码解释和文档生成"
echo "  ✓ 单元测试生成"
echo "  ✓ 代码重构建议"
echo ""
echo "详细文档: 查看 GEMINI_SETUP.md"
echo "========================================="
