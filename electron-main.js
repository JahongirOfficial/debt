import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import net from 'net';
import { fileURLToPath } from 'url';

// ES module da __dirname ni o'rnatish
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global o'zgaruvchilar
let backendProcess = null;
let backendPort = 5000;
let mainWindow = null;

// Belgilangan port bo'sh ekanligini tekshirish
function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, '127.0.0.1');
    server.on('error', () => resolve(false));
    server.on('listening', () => {
      server.close();
      resolve(true);
    });
  });
}

// Bo'sh port topish
async function findFreePort(startingPort) {
  let port = startingPort;
  while (port < startingPort + 100) {
    const isFree = await isPortFree(port);
    if (isFree) {
      return port;
    }
    port++;
  }
  throw new Error(`Could not find a free port starting from ${startingPort}`);
}

// Backend serverni ishga tushirish
async function startBackendServer() {
  try {
    console.log('Checking for free port...');
    backendPort = await findFreePort(5000);
    console.log(`Using port ${backendPort} for backend server`);

    // Backend serverni ishga tushiramiz
    const backendPath = path.join(__dirname, 'backend', 'server.js');
    console.log(`Starting backend server: ${backendPath}`);

    // Backend serverni ishga tushirish
    backendProcess = spawn('node', [backendPath], {
      cwd: path.join(__dirname, 'backend'),
      env: {
        ...process.env,
        PORT: backendPort,
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/qarzdaftar',
        NODE_ENV: 'production'
      },
      stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    // Backend loglarini kuzatish
    backendProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[Backend] ${output}`);
      
      // Server ishga tushganini tekshirish
      if (output.includes('Server running on port') || output.includes('Connected to MongoDB')) {
        console.log('Backend server successfully started');
      }
    });

    backendProcess.stderr.on('data', (data) => {
      console.error(`[Backend ERROR] ${data}`);
    });

    backendProcess.on('close', (code) => {
      console.log(`Backend process exited with code ${code}`);
    });

    backendProcess.on('error', (error) => {
      console.error('Failed to start backend process:', error);
    });

    // Server ishga tushishini kutish
    await new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds timeout
      const checkServer = setInterval(async () => {
        attempts++;
        const isFree = await isPortFree(backendPort);
        if (!isFree) {
          console.log('Backend server is running');
          clearInterval(checkServer);
          resolve(true);
        } else if (attempts >= maxAttempts) {
          console.log('Backend server failed to start in time');
          clearInterval(checkServer);
          resolve(false);
        }
      }, 1000);
    });

    return true;
  } catch (error) {
    console.error('Error starting backend server:', error);
    return false;
  }
}

// Asosiy oyna yaratish
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false // Local fayllarni yuklash uchun
    }
  });

  // React frontendni dist dan yuklash
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log(`Loading frontend from: ${indexPath}`);
  
  mainWindow.loadFile(indexPath).catch(err => {
    console.error('Failed to load frontend:', err);
  });

  // Oynani yopish hodisasi
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Yuklash xatolarini kuzatish
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Failed to load page: ${errorCode} ${errorDescription}`);
  });

  return mainWindow;
}

// Barcha child processlarni to'xtatish
function stopAllProcesses() {
  console.log('Stopping all child processes...');
  
  if (backendProcess) {
    try {
      console.log('Stopping backend process...');
      backendProcess.kill();
      backendProcess = null;
    } catch (error) {
      console.error('Error stopping backend process:', error);
    }
  }
}

// App tayyor bo'lganda ishga tushirish
app.whenReady().then(async () => {
  console.log('App is ready');

  // Backend serverni ishga tushirish
  console.log('Starting backend server...');
  const backendStarted = await startBackendServer();
  
  if (backendStarted) {
    console.log('Backend server started successfully');
  } else {
    console.error('Failed to start backend server, but continuing with app launch...');
  }

  // Oynani yaratish
  console.log('Creating main window...');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Barcha oynalar yopilganda appni to'xtatamiz
app.on('window-all-closed', () => {
  console.log('All windows closed');
  
  if (process.platform !== 'darwin') {
    // Backend processni to'xtatamiz
    stopAllProcesses();
    
    // Appni to'xtatamiz
    app.quit();
  }
});

// App yopilishidan oldin barcha child processlarni to'xtatamiz
app.on('before-quit', (event) => {
  console.log('App is about to quit, stopping all processes...');
  stopAllProcesses();
});

// Backend server portini frontendga jo'natish
ipcMain.handle('get-backend-port', () => {
  console.log('Frontend requested backend port:', backendPort);
  return backendPort;
});

// Ishlov berilmagan promise rad etilishlarini kuzatish
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Appni yopimaymiz, faqat xatoni konsolga chiqaramiz
});

// Ishlov berilmagan istisnolarni kuzatish
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Appni yopimaymiz, faqat xatoni konsolga chiqaramiz
});

// App qayta ishga tushganda backendni qayta ishga tushiramiz
app.on('second-instance', async () => {
  console.log('Second instance detected, restarting backend...');
  stopAllProcesses();
  await startBackendServer();
});