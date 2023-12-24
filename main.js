// Importamos los módulos necesarios de Electron
const { app, BrowserWindow, screen, Tray, Menu } = require("electron");
const path = require("path");

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
    width: 400,
    height: 200,
    title: "Botón de Pánico",
    x: width - 400, // Posición en el eje x
    y: height - 200, // Posición en el eje y
    show: true,
    icon: __dirname + "/alert-icon.png",
    refresh: true,
  });

  // Cargamos una URL en la ventana
  win.loadURL("http://www.pjud.cl/");

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
  tray = new Tray(path.join(__dirname, "alert-icon.png"));

  // Creamos un menú para la bandeja
  const contextMenu = Menu.buildFromTemplate([
    { label: "Mostrar", click: () => win.show() },
    { label: "Salir", click: () => win.hide() },
  ]);

  // Configuramos la bandeja
  tray.setToolTip("Botón de Pánico");
  tray.setContextMenu(contextMenu);

  // Recargamos la ventana cada 5 segundos
  setInterval(() => {
    win.reload();
  }, 5000); // 5000 milisegundos son 5 segundos

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
