# Gemini 工具快速开始

## 📦 安装状态

| 工具 | 状态 | 版本 |
|------|------|------|
| **Gemini CLI** | ✅ 已安装 | 0.16.0 |
| **Gemini Code Assist** | ⚠️ 需在IDE中安装 | - |

---

## 🚀 立即开始使用 Gemini CLI

### 首次使用（需要登录）

```bash
# 启动Gemini CLI
gemini

# 按照提示选择 "Login with Google"
# 在浏览器中完成登录
# 返回终端开始使用
```

### 常用命令速查

```bash
# 💬 快速提问
gemini "如何在JavaScript中读取文件？"

# 📝 代码解释
gemini "解释这段代码" < script.js

# 🔨 代码生成
gemini "写一个Python函数计算斐波那契数列"

# 🔍 搜索增强（联网查询）
gemini "2025年最新的AI技术趋势" --extensions google_search

# 📄 分析文件
gemini "总结这个README" < README.md

# 🔄 继续上次对话
gemini --resume latest

# 📋 查看历史对话
gemini --list-sessions
```

---

## 💡 实用场景

### 场景1: 调试代码

```bash
# 找出代码中的bug
gemini "帮我找出这段代码的问题" < buggy-code.js
```

### 场景2: 学习新技术

```bash
# 询问技术问题
gemini "什么是Docker容器？如何使用？"
```

### 场景3: 代码审查

```bash
# 审查代码质量
cat server.js | gemini "审查这段代码，提供改进建议"
```

### 场景4: 生成文档

```bash
# 为函数生成文档
gemini "为这个函数生成JSDoc注释" < function.js
```

### 场景5: 单元测试

```bash
# 生成测试用例
gemini "为这个函数生成Jest单元测试" < calculator.js
```

---

## 🎯 Gemini Code Assist（IDE扩展）

### 在VS Code中安装

**方法1: 图形界面**
1. 按 `Ctrl+Shift+X`（Mac: `Cmd+Shift+X`）
2. 搜索 `Gemini Code Assist`
3. 点击 `Install`
4. 点击侧边栏Gemini图标登录

**方法2: Remote SSH**
1. VS Code连接到此服务器
2. 在远程环境中安装扩展
3. 扩展会自动在服务器上运行

### 主要功能

- ⚡ **智能代码补全** - 边写边提示
- 💬 **AI聊天** - 在IDE中直接提问
- 📖 **代码解释** - 右键选择"Explain with Gemini"
- 🔧 **代码重构** - AI建议的改进方案
- ✅ **测试生成** - 自动生成单元测试
- 📝 **文档生成** - 自动生成函数文档

---

## 📊 配额限制

### Gemini CLI（免费版）

- **模型**: Gemini 2.5 Pro
- **上下文**: 100万tokens
- **速率**: 每分钟60次请求
- **每日**: 1000次请求
- **费用**: 完全免费

### Gemini Code Assist（免费版）

- **模型**: Gemini 2.5 Flash
- **功能**: 代码补全、聊天、解释
- **费用**: 完全免费

---

## 🛠️ 高级技巧

### 1. 管道操作

```bash
# 组合多个命令
cat *.js | gemini "分析这个项目的代码结构"
```

### 2. 文件输入

```bash
# 从文件读取
gemini "优化这段SQL查询" < query.sql
```

### 3. 输出重定向

```bash
# 保存AI生成的代码
gemini "创建一个Express.js服务器" > server.js
```

### 4. 使用工具

```bash
# Shell命令（需要确认）
gemini "列出所有大于10MB的文件" --extensions shell

# Google搜索
gemini "查找React 19的新特性" --extensions google_search
```

### 5. 批量处理

```bash
# 处理多个文件
for file in *.py; do
  echo "处理: $file"
  gemini "检查这个Python文件的代码质量" < "$file"
done
```

---

## 🔐 隐私和安全

### 数据处理

- ✅ 代码会发送到Google Cloud进行处理
- ✅ 使用HTTPS加密传输
- ✅ 符合Google隐私政策

### 最佳实践

- ❌ 不要发送敏感信息（密码、API密钥等）
- ❌ 不要发送专有代码（除非有授权）
- ✅ 审查AI生成的代码
- ✅ 将AI作为助手而非替代品

---

## 📚 更多资源

### 文档

- 📖 **完整指南**: 查看 `GEMINI_SETUP.md`
- 🧪 **测试脚本**: 运行 `./test-gemini-cli.sh`
- 💻 **安装脚本**: 运行 `./install-gemini-code-assist.sh`

### 在线资源

- [Gemini CLI GitHub](https://github.com/google-gemini/gemini-cli)
- [Gemini Code Assist文档](https://developers.google.com/gemini-code-assist)
- [Google AI Studio](https://aistudio.google.com/)

---

## ❓ 常见问题

**Q: 如何注销？**
```bash
rm -rf ~/.config/gemini-cli/
```

**Q: 命令无响应怎么办？**
- 检查网络连接
- 确认已登录：运行 `gemini` 检查登录状态

**Q: 如何查看配置？**
```bash
ls -la ~/.config/gemini-cli/
```

**Q: 支持中文吗？**
- ✅ 完全支持中文问答
- ✅ 支持中文注释和文档

**Q: 可以在项目中使用吗？**
- ✅ 可以用于个人项目
- ⚠️ 商业项目请查看使用条款

---

## 🎉 开始你的AI编程之旅！

```bash
# 现在就试试！
gemini "你好，帮我开始学习如何使用你"
```

---

**享受AI加持的编程体验！** 🚀
