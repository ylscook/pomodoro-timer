# GitHub 手动创建仓库指南

由于您的环境没有安装 GitHub CLI，请按照以下步骤手动创建仓库：

## 1. 创建个人访问令牌（PAT）
1. 登录 GitHub
2. 点击右上角头像 → Settings
3. 滚动到左侧菜单，点击 "Developer settings"
4. 点击 "Personal access tokens" → "Tokens (classic)"
5. 点击 "Generate new token" → "Generate new token (classic)"
6. 填写：
   - Note: `pomodoro-timer-upload`
   - Expiration: 选择适当的期限（如90天）
   - Scopes: 勾选 `repo`（完整的仓库访问权限）
7. 点击 "Generate token"
8. **立即复制生成的令牌**（只显示一次！）

## 2. 创建仓库
1. 访问 https://github.com/
2. 点击右上角 "+" → "New repository"
3. 填写：
   - Repository name: `pomodoro-timer`
   - Description: `番茄钟项目 - 多个版本的番茄工作法应用`
   - 选择 Public
   - 不要勾选 "Add a README file"
4. 点击 "Create repository"

## 3. 使用令牌推送代码
创建仓库后，在终端运行：

```bash
cd "/d/yls/workAndproject/project/AI/first-cc"

# 配置远程仓库（使用您的用户名）
git remote add origin https://github.com/ylscook/pomodoro-timer.git

# 重命名分支
git branch -M main

# 推送代码（替换 YOUR_TOKEN 为实际的令牌）
git push -u origin main
```

当提示输入密码时，粘贴您的个人访问令牌（不是GitHub密码）。

## 4. 替代方案：使用SSH
如果您已经配置了SSH密钥到GitHub，可以使用：

```bash
git remote add origin git@github.com:ylscook/pomodoro-timer.git
git branch -M main
git push -u origin main
```

## 验证成功
成功后，您可以在 https://github.com/ylscook/pomodoro-timer 查看您的仓库。