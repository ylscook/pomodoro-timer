# GitHub 配置说明

要上传项目到GitHub，请按以下步骤操作：

## 1. 创建GitHub仓库
1. 登录您的GitHub账号
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `pomodoro-timer` (或其他您喜欢的名称)
   - Description: `番茄钟项目 - 多个版本的番茄工作法应用`
   - 选择 Public（公开）或 Private（私有）
   - 不要勾选 "Add a README file"（因为我们已经有了）
4. 点击 "Create repository"

## 2. 配置远程仓库
创建仓库后，GitHub会显示类似以下命令：

```bash
git remote add origin https://github.com/您的用户名/仓库名.git
git branch -M main
git push -u origin main
```

## 3. 推送代码到GitHub
在本地执行上述命令即可完成推送。

## 4. 替换命令中的占位符
请将以下命令中的占位符替换为您的实际信息：

```bash
# 替换为您的GitHub用户名和仓库名
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 示例
如果您用户名是 "john-doe"，仓库名是 "pomodoro-timer"，命令应该是：

```bash
git remote add origin https://github.com/john-doe/pomodoro-timer.git
git branch -M main
git push -u origin main
```

## 需要的信息
请提供：
1. 您的GitHub用户名
2. 您希望的仓库名称

我将帮您执行这些命令。