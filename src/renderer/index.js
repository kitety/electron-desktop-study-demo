// const os = require('os')
// const platform = os.platform()
// const release = os.release()

// document.getElementById('platform').append(platform)
// document.getElementById('release').append(release)
console.log('renderer index.js')
console.log('window.fromPreload = ', window.fromPreload)
console.log(window.myFile)

document.getElementById('save').addEventListener('click', () => {
    window.myFile.saveFile('test.txt', '123')
})
