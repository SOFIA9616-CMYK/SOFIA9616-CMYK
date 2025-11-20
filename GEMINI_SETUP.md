# Gemini CLI 和 Gemini Code Assist 安装指南

## ✅ 已完成安装

### Gemini CLI

**状态**: ✅ 已成功安装

- **版本**: 0.16.0
- **安装位置**: `/opt/node22/bin/gemini`
- **安装方法**: npm全局安装

#### 快速开始使用Gemini CLI

1. **首次运行需要登录**:
```bash
gemini
```
这会启动一个交互式会话并提示你登录Google账号。

2. **选择登录方式**:
   - 选择 "Login with Google" 获得免费版（推荐）
   - 免费版配额：每分钟60个请求，每天1000个请求
   - 使用Gemini 2.5 Pro模型，100万token上下文窗口

3. **常用命令**:
```bash
# 启动交互式对话
gemini

# 直接提问
gemini "What is the capital of France?"

# 使用文件作为输入
gemini "Explain this code" < script.js

# 使用Google搜索增强
gemini --tools=google_search "Latest news about AI"

# 执行shell命令（需要确认）
gemini --tools=shell "List all files in current directory"

# 处理图片
gemini "Describe this image" --image=./photo.jpg

# 查看帮助
gemini --help
```

4. **内置工具**:
   - `google_search` - Google搜索增强
   - `shell` - 执行shell命令
   - `web_fetch` - 获取网页内容
   - `file` - 文件操作

5. **配置文件位置**:
   - 配置存储在 `~/.config/gemini-cli/`

#### 示例用法

```bash
# 代码解释
gemini "Explain this Python code" < script.py

# 代码生成
gemini "Write a Python function to calculate factorial"

# 调试帮助
gemini "Why is my Node.js server crashing?" --file=server.js

# 搜索最新信息
gemini --tools=google_search "What are the latest features in Python 3.13?"

# 文件分析
gemini "Summarize this document" < README.md

# 多文件处理
cat file1.js file2.js | gemini "Find potential bugs in this code"
```

---

## ⚠️ 待完成安装

### Gemini Code Assist

**状态**: ⚠️ 需要在本地IDE中安装

Gemini Code Assist是一个IDE扩展，类似于GitHub Copilot，提供AI代码补全、聊天、代码解释等功能。

#### 支持的IDE

1. **Visual Studio Code** (推荐)
2. **JetBrains系列** (IntelliJ IDEA, PyCharm, WebStorm等)

---

## 在VS Code中安装Gemini Code Assist

### 方法1: 通过VS Code界面安装（推荐）

1. **打开VS Code扩展面板**:
   - Windows/Linux: 按 `Ctrl + Shift + X`
   - Mac: 按 `Cmd + Shift + X`

2. **搜索扩展**:
   - 在搜索框输入: `Gemini Code Assist`

3. **安装**:
   - 找到 "Gemini Code Assist" (发布者: Google)
   - 点击 "Install" 按钮

4. **重启VS Code** (如果提示):
   - 点击 "Reload" 或重启VS Code

5. **登录**:
   - 安装完成后，点击侧边栏的Gemini图标
   - 选择 "Sign in with Google"
   - 在浏览器中完成Google账号登录
   - 返回VS Code，扩展即可使用

### 方法2: 通过命令行安装

如果你的VS Code有命令行工具（`code`命令），可以运行:

```bash
code --install-extension GoogleCloudTools.gemini-code-assist
```

### 方法3: 通过Remote SSH安装

如果你通过Remote SSH连接到这个服务器：

1. 在本地VS Code中连接到远程服务器
2. 在远程连接中打开扩展面板
3. 搜索并安装 "Gemini Code Assist"
4. 扩展会安装在远程服务器上

---

## 在JetBrains IDE中安装

### IntelliJ IDEA / PyCharm / WebStorm等

1. **打开设置**:
   - Windows/Linux: `File > Settings`
   - Mac: `IntelliJ IDEA > Preferences`

2. **进入插件页面**:
   - 点击 `Plugins`

3. **搜索插件**:
   - 切换到 `Marketplace` 标签
   - 搜索: `Gemini Code Assist`

4. **安装**:
   - 点击 `Install` 按钮
   - 安装完成后点击 `Restart IDE`

5. **登录**:
   - 重启后，在IDE中找到Gemini图标
   - 点击登录并使用Google账号认证

---

## Gemini Code Assist 功能特性

### 1. AI代码补全
- 智能代码自动完成
- 上下文感知的建议
- 支持多种编程语言

### 2. AI聊天助手
- 在IDE中直接与AI对话
- 询问代码问题
- 获取编程建议

### 3. 代码解释
- 选中代码，右键选择 "Explain with Gemini"
- 获得详细的代码解释

### 4. 代码生成
- 从注释生成代码
- 从自然语言描述生成函数

### 5. 代码转换
- 语言转换（如Python转JavaScript）
- 重构建议

### 6. 单元测试生成
- 自动生成测试用例
- 支持多种测试框架

### 7. 文档生成
- 自动生成函数文档
- 生成README等文档

---

## 免费版 vs 企业版

### Gemini Code Assist - 免费版（个人）

✅ **已包含**:
- 代码补全
- AI聊天
- 代码解释
- 使用Gemini 2.5 Flash模型
- 个人Google账号登录

### Gemini Code Assist - 企业版

需要Google Cloud订阅:
- Gemini 2.5 Pro模型
- 更高的配额
- 企业级支持
- 代码仓库集成
- 自定义模型微调

---

## 快速测试

### 测试Gemini CLI

在终端运行:
```bash
gemini "Hello, can you help me with coding?"
```

### 测试Gemini Code Assist

1. 在VS Code中打开一个代码文件
2. 开始输入代码，会看到AI建议
3. 按Tab接受建议
4. 打开Gemini聊天面板（点击侧边栏图标）
5. 尝试问问题: "如何在JavaScript中读取文件？"

---

## 常见问题

### Q: Gemini CLI需要付费吗？
A: 不需要。使用个人Google账号登录即可免费使用，每天1000次请求。

### Q: Gemini Code Assist需要付费吗？
A: 个人版免费。企业版需要Google Cloud订阅。

### Q: 数据隐私如何？
A:
- 个人版：你的代码会发送到Google进行处理
- 企业版：可以配置数据保留策略

### Q: 支持哪些编程语言？
A: 支持主流编程语言，包括：
- JavaScript/TypeScript
- Python
- Java
- Go
- C/C++
- Rust
- PHP
- Ruby
- 等等

### Q: 可以离线使用吗？
A: 不可以。Gemini CLI和Code Assist都需要网络连接。

### Q: 如何注销？
**Gemini CLI**:
```bash
# 配置文件在 ~/.config/gemini-cli/
rm -rf ~/.config/gemini-cli/
```

**Gemini Code Assist**:
- 在VS Code中点击Gemini图标
- 选择 "Sign out"

---

## 推荐工作流

### 1. 日常编码
- 使用 **Gemini Code Assist** 在IDE中获得实时代码建议
- 利用代码补全加速开发

### 2. 命令行任务
- 使用 **Gemini CLI** 处理快速查询
- 文件分析、代码解释等

### 3. 组合使用
```bash
# CLI生成代码框架
gemini "Create a REST API with Express.js" > api.js

# 然后在VS Code中用Code Assist完善细节
code api.js
```

---

## 下一步

1. ✅ **Gemini CLI已安装** - 运行 `gemini` 开始使用
2. ⚠️ **安装Gemini Code Assist** - 在你的VS Code或JetBrains IDE中安装
3. 📚 **学习更多**:
   - [Gemini CLI官方文档](https://github.com/google-gemini/gemini-cli)
   - [Gemini Code Assist文档](https://developers.google.com/gemini-code-assist)

---

## 需要帮助？

运行以下命令获取帮助:
```bash
gemini --help
```

或访问:
- Gemini CLI GitHub: https://github.com/google-gemini/gemini-cli
- Gemini Code Assist文档: https://developers.google.com/gemini-code-assist
