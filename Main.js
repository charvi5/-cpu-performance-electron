const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const electronLocalshortcut = require('electron-localshortcut');
// var ipc = require('ipc');
// var remote = require('remote');

let window = null

// Wait till app is ready
app.once('ready', () => {
    // Create new browser window
    window = new BrowserWindow({
        // for adding process calls in index.html
        webPreferences: {
        nodeIntegration: true
        },
        width: 500, 
        height: 400,
        titleBarStyle: 'hiddenInset',
        backgroundColor: "#111",
        // Don't show till window is ready, prevents white flickering
        show: false
    })

// create menu items to enable local shortcuts
    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label:'Save',
                    accelerator: 'CmdOrCtrl+S'
                },
                {
                    type:'separator'
                },
                {
                    label:'Exit',
                    click() {
                        app.quit()
                    },
                    accelerator: 'CmdOrCtrl+W'
                }
            ]
        }
    ])
    
    Menu.setApplicationMenu(menu); 
    
    electronLocalshortcut.register(window, 'CommandOrControl+C', () => {
        // take screenshot of entire window
        console.log('You pressed copy');
    
    });

    // load index.html of the app
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
     }))
    
    // window.webContents.openDevTools()
 

    window.once('ready-to-show', () => {
        window.show()
        })
   
})





