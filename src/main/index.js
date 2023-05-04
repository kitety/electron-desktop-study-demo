const { app, BrowserWindow } = require('electron')
const path = require('path');
const { URLSearchParams } = require('url');
let mainWindow;


app.whenReady().then(() => {
    createWindow()
})
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,// 风险大,开启
            // 关闭上下文隔离
            // preload.js 脚本和 index.html 是否共享相同的 document 和 window 对象
            contextIsolation: true,
            preload: path.join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
    mainWindow.webContents.openDevTools({ mode: "right" })
}
