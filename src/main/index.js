const { app, BrowserWindow } = require('electron')
const path = require('path');
const { URLSearchParams } = require('url');

const protocol = 'electron-desktop'
const scheme = `${protocol}://`
app.setAsDefaultProtocolClient(protocol)

let urlParam = {};
// electron-desktop://a=1
app.on('open-url', (event, url) => {
    console.log('url: ', url);

    const urlParams = new URLSearchParams(url.slice(scheme.length))
    urlParam = Object.fromEntries(urlParams.entries())
    console.log('urlParam: ', urlParam);

})

let mainWindow;
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, argv, workingDirectory) => {
        // Mac 平台只需要展示窗口即可
        mainWindow.restore()
        mainWindow.show()

        // Windows 平台上需要判断新的实例是否被 scheme 唤起
        const url = argv.find(v => v.startsWith(scheme))
        if (url) { // 如果发现 electron-desktop:// 前缀，说明是通过 scheme 唤起
            console.log(url)
        }
    })
}

app.whenReady().then(() => {
    createWindow()
})

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 })
    mainWindow.loadURL('https://www.juejin.cn')
}
