import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const path = require("path");
const fs = require("fs");

const userDataPath = app.getPath("userData");

const configPath = path.join(userDataPath, "currentnotebook.txt");

if (!fs.existsSync(path.join(userDataPath, "currentnotebook.txt"))) {
  fs.writeFileSync(path.join(userDataPath, "currentnotebook.txt"));
}

// Create the notebooks folder if it doesn't exist
if (!fs.existsSync(path.join(userDataPath, "notebooks/"))) {
  fs.mkdirSync(path.join(userDataPath, "notebooks/"));
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    'icon': __dirname + '/../../resources/icon64x64.png',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC
  ipcMain.handle("listNotebooks", (event) => {
    const dir = path.join(userDataPath, "notebooks/")

    let files = fs.readdirSync(dir);
    let fileList = [];

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        fileList.push(filePath);
      }
    });

    return fileList;
  });

  ipcMain.handle("getCurrentNotebook", (event) => {
    return fs.readFileSync(path.join(userDataPath, "currentnotebook.txt"), {
      encoding: "utf-8",
    });
  });

  ipcMain.handle("listFolders", (event, currentNotebook) => {
    // Check for path existence
    if (!fs.existsSync(currentNotebook)){
      return
    }
    
    // Check if there are any special paths
    if (currentNotebook.includes("../")){
      return
    }
    if (currentNotebook.includes("..\\")){
      return
    }

    try {
      const dir = currentNotebook
      
      let files = fs.readdirSync(dir);
      let fileList = [];
  
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          fileList.push(filePath);
        }
      });
  
      return fileList;
    } catch (error) {
      console.error("Error reading directory:", error);
      return [];
    }
  });

  ipcMain.handle("listFiles", (event, dir) => {
    // Check for path existence
    if (!fs.existsSync(dir)){
      return
    }
    
    // Check if there are any special paths
    if (dir.includes("../")){
      return
    }
    if (dir.includes("..\\")){
      return
    }

    try {
      let files = fs.readdirSync(dir);
      let fileList = [];
  
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (!stat.isDirectory()) {
          let noteinfo = "";
          if (
            filePath.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] == "md" ||
            filePath.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] == "txt"
          ) {
            fileList.push({
              name: filePath,
              info: fs.readFileSync(filePath, { encoding: "utf-8" }),
              mtime: stat.mtime,
            });
          } else {
            fileList.push({ name: filePath, info: "", mtime: stat.mtime });
          }
        }
      });
  
      // Sort Files
      fileList.sort((a, b) => {
        const isAPinned = a.name.includes("#pin");
        const isBPinned = b.name.includes("#pin");
  
        if (isAPinned && !isBPinned) {
          return -1;
        } else if (!isAPinned && isBPinned) {
          return 1;
        } else {
          return b.mtime.getTime() - a.mtime.getTime();
        }
      });

      return fileList

    } catch (error) {
      console.error(error)
      return []
    }

  });

  ipcMain.handle("getFile", (event, path) => {
    // Check for path existence
    if (!fs.existsSync(path)){
      return
    }
    
    // Check if there are any special paths
    if (path.includes("../")){
      return
    }
    if (path.includes("..\\")){
      return
    }

    return fs.readFileSync(path, { encoding: "utf8" })
  });

  ipcMain.handle("saveFile", (event, path, text) => {
    // Check for path existence
    if (!fs.existsSync(path)){
      return
    }
    
    // Check if there are any special paths
    if (path.includes("../")){
      return
    }
    if (path.includes("..\\")){
      return
    }
    
    return fs.writeFileSync(path, text, "utf-8");
  });

  ipcMain.handle("createNote", (event, path) => {
    fs.writeFileSync(path, "")
    return
  });

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
