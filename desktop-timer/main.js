const { app, BrowserWindow, Menu, ipcMain, Tray } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let tray = null;
let isMinimized = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: false
        },
        icon: path.join(__dirname, 'assets/icon.png'),
        show: false
    });

    mainWindow.loadFile('index.html');

    // 窗口准备就绪后显示
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // 创建系统托盘
    createTray();

    // 窗口关闭事件
    mainWindow.on('close', (event) => {
        if (!isMinimized) {
            event.preventDefault();
            mainWindow.hide();
        }
    });

    // 窗口最小化事件
    mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });
}

function createTray() {
    const trayIcon = path.join(__dirname, 'assets/tray-icon.png');
    tray = new Tray(trayIcon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示/隐藏',
            click: () => {
                if (mainWindow.isVisible()) {
                    mainWindow.hide();
                } else {
                    mainWindow.show();
                    mainWindow.focus();
                }
            }
        },
        { label: '开始', click: () => mainWindow.webContents.send('start-timer') },
        { label: '暂停', click: () => mainWindow.webContents.send('pause-timer') },
        { label: '重置', click: () => mainWindow.webContents.send('reset-timer') },
        { label: '退出', click: () => app.quit() }
    ]);

    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC 处理程序
ipcMain.handle('get-app-version', () => app.getVersion());
ipcMain.handle('get-platform', () => process.platform);

// 监听来自渲染进程的消息
ipcMain.on('update-tray-tooltip', (event, text) => {
    if (tray) {
        tray.setToolTip(`番茄钟 - ${text}`);
    }
});