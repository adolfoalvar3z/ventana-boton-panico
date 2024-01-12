if(require('electron-squirrel-startup')) return;
// Importamos los módulos necesarios de Electron
const { app, BrowserWindow, screen, Tray, Menu, dialog } = require("electron");
const path = require("path");

let sitio = "http://10.130.161.140:8000/boton/";

// Declaramos las variables para la bandeja y los iconos
let tray = null;
let trayIconVisible = path.join(__dirname, "alert-icon.png");
let trayIconHidden = path.join(__dirname, "alert-icon.png");

// Función para crear la ventana de la aplicación
const createWindow = () => {
  // Obtenemos el tamaño de la pantalla
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Creamos una nueva ventana
  const win = new BrowserWindow({
    width: 250,
    height: 140,
    title: "Botón de Pánico",
    x: width - 250, // Posición en el eje x
    y: height - 140, // Posición en el eje y
    show: true,
    icon: __dirname + "/alert-icon.ico",
    refresh: true,
  });

  // Cargamos una URL en la ventana
  win.loadURL(sitio);
  win.webContents.on("did-fail-load", () => {
    win.loadURL(
      "data:text/html;charset=utf-8," +
        encodeURI("<body><h2>Error: No se pudo cargar la URL</h2></body>")
    );
    setInterval(() => {
      win.loadURL(sitio);
    }, 5000); // 5000 milisegundos son 5 segundos
  });

  // Configuramos la ventana para que siempre esté en primer plano
  win.isAlwaysOnTop(true);
  win.setAlwaysOnTop(true);

  // Ocultamos la barra de menús
  win.setMenuBarVisibility(false);

  // Configuramos la ventana para que no se pueda cerrar, minimizar, maximizar, redimensionar, poner en pantalla completa o mover
  win.isClosable(false);
  win.setClosable(false);
  win.setMinimizable(false);
  win.setMaximizable(false);
  win.setResizable(false);
  win.setFullScreenable(false);
  win.setMovable(false);

  // Ocultamos y mostramos la ventana
  win.hide();
  win.show();

  // Creamos una nueva bandeja con un icono
  tray = new Tray(path.join(__dirname, "alert-icon.ico"));

  // Creamos un menú para la bandeja
  const contextMenu = Menu.buildFromTemplate([
    { label: "Mostrar", click: () => win.show() },
    { label: "Salir", click: () => win.hide() },
  ]);

  // Configuramos la bandeja
  tray.setToolTip("Botón de Pánico");
  tray.setContextMenu(contextMenu);

/*   // Recargamos la ventana cada 5 segundos
  setInterval(() => {
    win.reload();
  }, 5000); // 5000 milisegundos son 5 segundos */

  // Prevenimos que la ventana se cierre o minimice, en su lugar la ocultamos
  win.on("close", (event) => {
    event.preventDefault();
    win.hide();
  });
  win.on("minimize", (event) => {
    event.preventDefault();
    win.hide();
  });

  // Cambiamos el icono de la bandeja cuando la ventana se muestra u oculta
  win.on("show", () => {
    tray.setImage(trayIconVisible);
  });
  win.on("hide", () => {
    tray.setImage(trayIconHidden);
  });
};



// Creamos la ventana cuando la aplicación esté lista
app.whenReady().then(() => {
  createWindow();
});