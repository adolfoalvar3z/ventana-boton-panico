const { app, BrowserWindow, screen, Tray, Menu } = require('electron')
const path = require('path');

let tray = null;

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
      width: 400,
      height: 200,
      title: 'Botón de Pánico',
      x: width - 400, // Posición en el eje x
      y: height - 200, // Posición en el eje y
      show: true,
      icon:  __dirname + '/alert-icon.png',
    });

    win.loadURL('http://www.pjud.cl/');
    win.isAlwaysOnTop(true);
    win.setAlwaysOnTop(true);
    win.setMenuBarVisibility(false);
    win.isClosable(false);
    win.setClosable(false);
    win.setMinimizable(false);
    win.setMaximizable(false);
    win.setResizable(false);
    win.setFullScreenable(false);
    win.setMovable(false);
    win.hide();
    win.show();
    tray = new Tray(path.join(__dirname, 'alert-icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Mostrar', click: () => win.show() },
        { label: 'Salir', click: () => win.hide() }
    ]);
    tray.setToolTip('Botón de Pánico');
    tray.setContextMenu(contextMenu);

    win.on('close', (event) => {
        event.preventDefault();
        win.hide();
    });

    win.on('minimize', (event) => {
        event.preventDefault();
        win.hide();
    });

    win.on('show', () => {
        //tray.setHighlightMode('always')
    });
}

app.whenReady().then(() => {
    createWindow()
})
