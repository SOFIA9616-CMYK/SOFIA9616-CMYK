#!/bin/bash

# 本地Mac环境快速修复脚本
# 用于修复常见的设置问题

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║           本地Mac环境快速修复脚本                            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查1: Node.js版本
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 检查Node.js..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js已安装: $NODE_VERSION"

    # 检查版本是否 >= 18
    NODE_MAJOR=$(node --version | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo -e "${GREEN}✓${NC} 版本符合要求 (需要 >= v18)"
    else
        echo -e "${RED}✗${NC} 版本过低，需要 v18 或更高"
        echo "   请运行: brew install node"
    fi
else
    echo -e "${RED}✗${NC} Node.js未安装"
    echo "   请运行: brew install node"
fi

echo ""

# 检查2: package.json格式
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. 检查package.json..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "package.json" ]; then
    if python3 -m json.tool package.json > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} package.json格式正确"
    else
        echo -e "${RED}✗${NC} package.json格式错误"
        echo "   修复方法:"
        echo "   git checkout HEAD -- package.json"

        read -p "是否现在修复? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git checkout HEAD -- package.json
            echo -e "${GREEN}✓${NC} 已重置package.json"
        fi
    fi
else
    echo -e "${RED}✗${NC} package.json不存在"
    echo "   请确认在项目根目录下"
fi

echo ""

# 检查3: node_modules
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. 检查依赖安装..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules存在"
else
    echo -e "${YELLOW}⚠${NC} node_modules不存在，需要安装依赖"

    read -p "是否现在安装? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install
    fi
fi

echo ""

# 检查4: Gemini CLI
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. 检查Gemini CLI..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if command -v gemini &> /dev/null; then
    GEMINI_VERSION=$(gemini --version)
    echo -e "${GREEN}✓${NC} Gemini CLI已安装: v$GEMINI_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Gemini CLI未安装"

    read -p "是否现在安装? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install -g @google/gemini-cli
        echo -e "${GREEN}✓${NC} Gemini CLI安装完成"
    fi
fi

echo ""

# 检查5: 环境变量文件
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. 检查环境变量..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env文件存在"
else
    echo -e "${YELLOW}⚠${NC} .env文件不存在"

    if [ -f ".env.example" ]; then
        read -p "是否从.env.example创建? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            cp .env.example .env
            echo -e "${GREEN}✓${NC} 已创建.env文件"
            echo -e "${YELLOW}⚠${NC} 请编辑.env文件，填入你的API密钥"
        fi
    fi
fi

echo ""

# 检查6: 脚本文件
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. 检查脚本文件..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

scripts=("test-gemini-cli.sh" "install-gemini-code-assist.sh")
for script in "${scripts[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            echo -e "${GREEN}✓${NC} $script 存在且可执行"
        else
            echo -e "${YELLOW}⚠${NC} $script 存在但不可执行"
            chmod +x "$script"
            echo -e "   已添加执行权限"
        fi
    else
        echo -e "${RED}✗${NC} $script 不存在"
        echo "   运行: git pull origin <分支名>"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "检查完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 总结和建议
echo "下一步建议:"
echo ""
echo "1. 如果package.json有问题:"
echo "   git checkout HEAD -- package.json"
echo "   npm cache clean --force"
echo "   npm install"
echo ""
echo "2. 如果需要安装Gemini CLI:"
echo "   npm install -g @google/gemini-cli"
echo ""
echo "3. 配置环境变量:"
echo "   编辑 .env 文件，填入你的API密钥"
echo ""
echo "4. 测试运行:"
echo "   gemini \"Hello\""
echo "   npm run dev"
echo ""
echo "详细文档: cat LOCAL_SETUP.md"
echo ""
