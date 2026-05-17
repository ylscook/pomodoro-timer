# 番茄钟项目

这是一个包含多种实现的番茄钟应用集合。

## 项目结构

```
first-cc/
├── timer.html              # 基础版本（纯HTML/CSS/JS）
├── pomodoro.html          # 增强版本（带统计数据和动画）
├── desktop-timer/          # Electron桌面版
│   ├── package.json
│   ├── main.js             # Electron主进程
│   └── index.html          # 桌面版界面
└── react-pomodoro/         # React版本
    ├── src/
    │   ├── App.tsx         # React组件
    │   └── App.css         # 样式
    └── package.json
```

## 功能特点

### 通用功能
- **工作时间**：默认25分钟
- **短休息**：默认5分钟
- **长休息**：默认15分钟
- **长休息间隔**：每4个番茄钟后进入长休息
- **进度环显示**：直观显示剩余时间
- **声音提醒**：时间到达时播放提示音
- **跳过模式**：手动切换工作/休息模式

### 高级功能（增强版和React版）
- **本地存储**：自动保存设置和统计数据
- **统计数据**：记录完成的番茄数量、专注时间、连续天数
- **通知系统**：桌面通知提醒
- **自定义设置**：可调整所有时间参数

## 运行方法

### 1. 纯HTML版本
直接在浏览器中打开 `timer.html` 或 `pomodoro.html` 即可使用。

### 2. Electron桌面版
```bash
cd desktop-timer
npm install
npm start
```

### 3. React版本
```bash
cd react-pomodoro
npm start
```

## 技术栈

- **HTML/CSS/JS**：基础实现
- **Electron**：跨平台桌面应用框架
- **React + TypeScript**：现代前端框架
- **React Icons**：图标库

## 扩展建议

1. **数据持久化**：可以将统计数据同步到云端
2. **多任务管理**：支持为不同任务设置不同的番茄钟
3. **数据分析**：生成专注时间报表
4. **团队协作**：共享番茄钟状态
5. **快捷键支持**：添加全局快捷键控制
6. **主题定制**：支持多种界面主题

## 作者

根据您提供的UI设计图开发的番茄钟应用。