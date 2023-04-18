const { app, BrowserWindow } = require('electron')
const path = require('path');
const { URLSearchParams } = require('url');
let mainWindow;



const protocol = 'juejin'
const scheme = `${protocol}://`
app.setAsDefaultProtocolClient(protocol)

let urlParam = {};

handleSchemeWakeUp(process.argv)


const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, argv, workingDirectory) => {
        // Mac 平台只需要展示窗口即可
        mainWindow.restore()
        mainWindow.show()
        handleSchemeWakeUp(argv)
    })
}
// juejin://
// juejin://width=500&heigh=300
app.on('open-url', (event, url) => {
    handleSchemeWakeUp(url)
})

app.whenReady().then(() => {
    createWindow()
})
function createWindow() {
    const width = parseInt(urlParams.width) || 800
    const height = parseInt(urlParams.height) || 600
    if (mainWindow) {
        mainWindow.setSize(width, height)
    } else {
        mainWindow = new BrowserWindow({ width, height })
        mainWindow.loadURL('https://www.juejin.cn')
    }
}
function handleSchemeWakeUp(argv) {
    const url = [].concat(argv).find((v) => v.startsWith(scheme))
    if (!url) return
    const searchParams = new URLSearchParams(url.slice(scheme.length))
    urlParams = Object.fromEntries(searchParams.entries())
    if (app.isReady()) createWindow()
}
