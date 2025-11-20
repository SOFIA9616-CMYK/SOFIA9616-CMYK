# 本地Mac环境设置指南

## 🔍 重要说明

**当前情况**：
- ✅ 服务器端已经安装好了所有工具（包括Gemini CLI）
- ⚠️ 你现在在本地Mac上，需要单独设置

根据你的截图，你在本地Mac（machenxi）上遇到了以下问题：
1. `package.json` JSON解析错误
2. `gemini` 命令找不到
3. 测试脚本找不到

## 📝 本地Mac设置步骤

### 第1步：克隆代码（如果还没有）

```bash
# 克隆仓库到本地
git clone <你的仓库地址>
cd SOFIA9616-CMYK

# 切换到正确的分支
git checkout claude/setup-backend-debugging-015dWnZNv3qQkA1rZCV1kiQw
```

### 第2步：检查并修复package.json

从错误信息看，你的本地package.json可能有问题。让我们重新拉取：

```bash
# 重置package.json（如果被修改了）
git checkout HEAD -- package.json

# 或者完全重置仓库
git fetch origin
git reset --hard origin/claude/setup-backend-debugging-015dWnZNv3qQkA1rZCV1kiQw
```

### 第3步：在本地Mac安装Node依赖

```bash
# 确保你有Node.js（需要v18+）
node --version

# 如果没有Node.js，先安装：
# brew install node

# 安装项目依赖
npm install
```

### 第4步：配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑.env文件，填入你的API密钥
# 使用你喜欢的编辑器，比如：
nano .env
# 或
code .env
```

### 第5步：在本地Mac安装Gemini CLI

```bash
# 全局安装Gemini CLI
npm install -g @google/gemini-cli

# 验证安装
gemini --version

# 首次使用需要登录
gemini
```

### 第6步：测试运行

```bash
# 测试Gemini CLI
gemini "Hello"

# 运行测试脚本
./test-gemini-cli.sh

# 启动后端服务
npm run dev
```

## 🚨 常见错误修复

### 错误1: `npm error JSON.parse`

**原因**：package.json文件格式错误或被修改

**解决方案**：
```bash
# 方法1: 重置文件
git checkout HEAD -- package.json

# 方法2: 查看文件内容，确认是否有乱码
cat package.json

# 方法3: 完全重新克隆
cd ..
rm -rf SOFIA9616-CMYK
git clone <仓库地址>
```

### 错误2: `zsh: command not found: gemini`

**原因**：Gemini CLI未在本地安装

**解决方案**：
```bash
# 安装Gemini CLI
npm install -g @google/gemini-cli

# 如果npm全局安装有权限问题，可能需要：
sudo npm install -g @google/gemini-cli
```

### 错误3: `no such file or directory: ./test-gemini-cli.sh`

**原因**：文件未从git拉取，或权限问题

**解决方案**：
```bash
# 确认文件存在
ls -la *.sh

# 如果不存在，重新拉取
git pull origin claude/setup-backend-debugging-015dWnZNv3qQkA1rZCV1kiQw

# 添加执行权限
chmod +x test-gemini-cli.sh
chmod +x install-gemini-code-assist.sh
```

### 错误4: `zsh: command not found: #`

**原因**：你可能复制了README中的注释行

**解决方案**：
不要复制 `#` 开头的注释行，只复制实际命令。

比如这样是错误的：
```bash
cp .env.example .env  # 不要复制这个注释
```

应该这样：
```bash
cp .env.example .env
```

## 📋 正确的本地使用流程

### 方式A：在本地Mac运行所有服务

```bash
# 1. 克隆并进入目录
git clone <仓库地址>
cd SOFIA9616-CMYK

# 2. 切换分支
git checkout claude/setup-backend-debugging-015dWnZNv3qQkA1rZCV1kiQw

# 3. 安装依赖
npm install

# 4. 安装Gemini CLI（全局）
npm install -g @google/gemini-cli

# 5. 配置环境变量
cp .env.example .env
# 然后编辑.env文件

# 6. 启动服务
npm run dev

# 7. 使用Gemini CLI
gemini "你好"
```

### 方式B：使用服务器上已安装的环境（推荐）

```bash
# SSH连接到服务器
ssh user@your-server

# 进入项目目录
cd /home/user/SOFIA9616-CMYK

# 直接使用（已经安装好了）
gemini "你好"
npm run dev
```

## 🔧 快速修复当前问题

根据你的截图，执行以下命令修复：

```bash
# 1. 完全重置仓库（清除所有本地修改）
git fetch origin
git reset --hard origin/claude/setup-backend-debugging-015dWnZNv3qQkA1rZCV1kiQw

# 2. 确认package.json正确
cat package.json | head -20

# 3. 清理npm缓存
npm cache clean --force

# 4. 重新安装
npm install

# 5. 安装Gemini CLI
npm install -g @google/gemini-cli

# 6. 验证
node --version
npm --version
gemini --version
```

## ✅ 验证一切正常

运行以下命令验证：

```bash
# 检查Node.js
node --version  # 应该显示 v18+

# 检查npm
npm --version

# 检查package.json
cat package.json  # 应该看到正确的JSON格式

# 检查Gemini CLI
gemini --version  # 应该显示版本号

# 检查文件
ls -la *.sh  # 应该看到两个.sh文件

# 检查依赖
npm list --depth=0
```

## 🆚 服务器 vs 本地对比

| 项目 | 服务器（已完成） | 本地Mac（需要设置） |
|------|------------------|---------------------|
| Gemini CLI | ✅ 已安装 v0.16.0 | ⚠️ 需要安装 |
| Node.js依赖 | ✅ 已安装 | ⚠️ 需要运行 `npm install` |
| 环境变量 | ✅ 有.env.example | ⚠️ 需要创建.env |
| 项目文件 | ✅ 所有文件完整 | ⚠️ 需要git pull |

## 💡 推荐方式

**最简单的方式**：直接SSH到服务器使用，所有东西都已经设置好了！

```bash
# 连接到服务器
ssh user@your-server

# 进入项目
cd /home/user/SOFIA9616-CMYK

# 直接使用
gemini "帮我写个Python函数"
npm run dev
```

如果你想在本地Mac使用，需要完整按照本文档的步骤设置一遍。

---

**需要帮助？** 运行 `cat GEMINI_SETUP.md` 查看完整文档
