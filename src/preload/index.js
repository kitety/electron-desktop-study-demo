
const os = require('os')
const fs = require('fs')
const platform = os.platform()
const release = os.release()
const { contextBridge } = require('electron')

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('platform').append(platform)
    document.getElementById('release').append(release)
})



const homeDir = require('os').homedir(); // See: https://www.npmjs.com/package/os
const desktopDir = `${homeDir}/Desktop`;
console.log(desktopDir);
console.log('preload index.js')
console.log('platform', os.platform())
window.fromPreload = 'something fromPreload'
contextBridge.exposeInMainWorld('myFile', {
    saveFile: (filename, content) => {
        console.log('saveFile', filename, content)
        fs.writeFileSync(`${desktopDir}/${filename}`, content)
    }
})
