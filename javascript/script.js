/* 
Now it's not good cause when i set this, the default blur will be remove of everywhere.

function change_brightness() {
  var brightnessVal = elements.brightness_range.value;

  elements.body.style.filter = `brightness(${brightnessVal + '%'})`;
  elements.body.style.backdropFilter = `brightness(${brightnessVal + '%'})`;
}
*/

/********** ELEMENTS **********/
const elements = {
  body: document.querySelector("body"),
  navbar: document.querySelector(".navbar"),
  open_spotlight: document.querySelector(".open_Search"),
  spotlight_search: document.querySelector(".spotlight_serach"),
  brightness_range: document.getElementById("brightness"),
  sound_range: document.getElementById("sound"),
  clockElement: document.getElementById("clock"),
  clockWrapper: document.querySelector(".clock"),
  widgetsPanel: document.querySelector(".widgets-panel"),
  batteryButton: document.querySelector(".battery"),
  batteryText: document.querySelector(".battery__text"),
  batteryPopup: document.querySelector(".battery__popup"),
  batteryPopupText: document.querySelector(".battery__popup header span"),
  batteryProgress: document.querySelector(".battery__progress"),
  batteryIsChargingLogo: document.querySelector(".is-charging"),
  powerSource: document.querySelector(".power-source"),
};

// Calculator App
const calculatorApp = {
  app_name: document.querySelector("#calculator"),
  window: document.querySelector(".calculator"),
  full: document.querySelector(".full"),
  close: document.querySelector(".close-cal"),
  backfull: document.querySelector(".min-cal"),
  point: document.querySelector("#point-cal"),
  opening: document.querySelector(".open-cal"),
  opening_l: document.querySelector(".open-cal-lunching"),
};

// Notes App
const notesApp = {
  app_name: document.querySelector("#Notes"),
  window: document.querySelector(".note"),
  full: document.querySelector(".full-note"),
  close: document.querySelector(".close-note"),
  backfull: document.querySelector(".backfull-note"),
  point: document.querySelector("#point-note"),
  adding: document.querySelector(".adding"),
  deleting: document.querySelector(".deleting"),
  content_typing: document.querySelector(".content__typing"),
  opening: document.querySelector(".open-note"),
  notes: document.querySelector(".content__sidebar--notes"),
};

// Terminal App
const terminalApp = {
  app_name: document.querySelector("#Terminal"),
  window: document.querySelector(".terminal"),
  full: document.querySelector(".full"),
  close: document.querySelector(".close"),
  backfull: document.querySelector(".backfull"),
  point: document.querySelector("#point-terminal"),
  content: document.querySelector(".terminal_content"),
  taskbar: document.querySelector(".terminal .window__taskbar"),
  opening: document.querySelector(".open-terminal"),
};

// Maps App
const mapsApp = {
  app_name: document.querySelector("#map"),
  window: document.querySelector(".maps"),
  full: document.querySelector(".maps .full-map"),
  close: document.querySelector(".maps .close-map"),
  backfull: document.querySelector(".maps .backfull-map"),
  point: document.querySelector("#point-maps"),
  opening: document.querySelector(".open-map"),
};

// Safari App
const safariApp = {
  app_name: document.querySelector("#Safari-nav"),
  window: document.querySelector(".safari"),
  full: document.querySelector(".safari .full-map"),
  close: document.querySelector(".safari .close-map"),
  backfull: document.querySelector(".safari .backfull-map"),
  point: document.querySelector("#point-safari"),
  opening: document.querySelector(".open-safari"),
};

// Settings App
const settingsApp = {
  app_name: document.querySelector("#Settings-nav"),
  window: document.querySelector(".settings-app"),
  full: document.querySelector(".settings-app .full-map"),
  close: document.querySelector(".settings-app .close-map"),
  backfull: document.querySelector(".settings-app .backfull-map"),
  point: document.querySelector("#point-settings"),
  opening: document.querySelector(".open-settings"),
};

// Music App
const musicApp = {
  app_name: document.querySelector("#Music-nav"),
  window: document.querySelector(".music"),
  full: document.querySelector(".music .full-map"),
  close: document.querySelector(".music .close-map"),
  backfull: document.querySelector(".music .backfull-map"),
  point: document.querySelector("#point-music"),
  opening: document.querySelector(".open-music"),
};

// App Store App
const appStoreApp = {
  app_name: document.querySelector("#Appstore-nav"),
  window: document.querySelector(".appstore"),
  full: document.querySelector(".appstore .full-appstore"),
  close: document.querySelector(".appstore .close-appstore"),
  backfull: document.querySelector(".appstore .backfull-appstore"),
  point: document.querySelector("#point-appstore"),
  opening: document.querySelector(".open-appstore"),
};


// Launchpad
const launchpad = {
  container: document.querySelector(".container__Window"),
  window: document.querySelector(".launchpad"),
  searchbox: document.querySelector(".launchpad .searchbox"),
  app_container: document.querySelector(".Apps-container"),
  point: document.querySelector("#point-launchpad"),
  opening: document.querySelector(".open-lunchpad"),
};

/********** LISTENERS **********/

// Overlay para atenuar el brillo
let brightnessOverlay;
function createBrightnessOverlay() {
  if (document.getElementById('brightness-overlay')) return;
  brightnessOverlay = document.createElement('div');
  brightnessOverlay.id = 'brightness-overlay';
  brightnessOverlay.style.position = 'fixed';
  brightnessOverlay.style.top = 0;
  brightnessOverlay.style.left = 0;
  brightnessOverlay.style.width = '100vw';
  brightnessOverlay.style.height = '100vh';
  brightnessOverlay.style.pointerEvents = 'none';
  brightnessOverlay.style.zIndex = 99999;
  brightnessOverlay.style.background = 'black';
  brightnessOverlay.style.opacity = '0';
  brightnessOverlay.style.transition = 'opacity 0.2s';
  document.body.appendChild(brightnessOverlay);
}

function updateBrightnessOverlay() {
  if (!elements.brightness_range || !brightnessOverlay) return;
  let val = parseInt(elements.brightness_range.value);
  let opacity = 1 - (val - 20) / 80;
  if (opacity < 0) opacity = 0;
  if (opacity > 1) opacity = 1;
  brightnessOverlay.style.opacity = opacity.toString();
}

document.addEventListener('DOMContentLoaded', () => {
  createBrightnessOverlay();
  if (elements.brightness_range) {
    elements.brightness_range.addEventListener('input', updateBrightnessOverlay);
    updateBrightnessOverlay();
  }
  if (elements.spotlight_search) {
    elements.spotlight_search.classList.remove("opened");
  }
  if (typeof digi === 'function') {
    digi();
  }
});

// Función para centrar cualquier ventana manualmente
function centerWindow(win) {
    const x = (window.innerWidth / 2) - (win.offsetWidth / 2);
    const y = (window.innerHeight / 2) - (win.offsetHeight / 2);
    win.style.left = x + "px";
    win.style.top = y + "px";
}

// --- LÓGICA DE MAXIMIZADO UNIFICADA ---
document.addEventListener('DOMContentLoaded', () => {
    const maximizeButtons = document.querySelectorAll('.full, .full-note, .full-map, .max-cal, .full-appstore');

    maximizeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const win = btn.closest('.calculator, .note, .terminal, .maps, .safari, .settings-app, .music, .appstore, #about-window');
            if (!win) return;

            const isMaximized = win.classList.contains('window--maximized');

            if (isMaximized) {
                // RESTAURAR
                win.classList.remove('window--maximized');
                win.style.top = win.dataset.preTop;
                win.style.left = win.dataset.preLeft;
                win.style.width = win.dataset.preWidth;
                win.style.height = win.dataset.preHeight;
                win.style.transform = win.dataset.preTransform || "none";
            } else {
    // MAXIMIZAR
    const rect = win.getBoundingClientRect();

    if (!win.classList.contains('window--snap-left') && !win.classList.contains('window--snap-right')) {
        win.dataset.preTop = win.style.top || rect.top + "px";
        win.dataset.preLeft = win.style.left || rect.left + "px";
        win.dataset.preWidth = rect.width + "px"; 
        win.dataset.preHeight = rect.height + "px";
        win.dataset.preTransform = win.style.transform || "none";
    }

    const navbarHeight = 30; 
    const dockMargin = 85;   
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight - navbarHeight - dockMargin;

    win.classList.remove('window--snap-left', 'window--snap-right');
    
    win.classList.add('window--maximized');
    win.style.top = navbarHeight + "px";
    win.style.left = "0px";
    win.style.width = availableWidth + "px";
    win.style.height = availableHeight + "px";
    win.style.transform = "none"; 
}
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const excludeList = []; 
    let isResizing = false; 

    function makeResizable(win) {
        if (excludeList.some(sel => win.matches(sel))) return;

        const resizers = ['r', 'b', 'rb', 'l', 'lb', 't', 'tl', 'tr'];
        
        const cursorMap = {
            'r': 'e-resize', 'b': 's-resize', 'l': 'w-resize', 't': 'n-resize',
            'rb': 'se-resize', 'lb': 'sw-resize', 'tl': 'nw-resize', 'tr': 'ne-resize'
        };

        resizers.forEach(type => {
            const resizer = document.createElement('div');
            resizer.className = `resizer ${type}`;
            
            resizer.addEventListener('mouseenter', () => {
                if (!isResizing) document.body.style.setProperty('cursor', cursorMap[type], 'important');
            });
            resizer.addEventListener('mouseleave', () => {
                if (!isResizing) document.body.style.cursor = '';
            });

            resizer.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation(); 
                isResizing = true; 
                win.classList.remove('window--maximized');
                initResize(e, type, win);
            });
            win.appendChild(resizer);
        });

        function initResize(e, type, win) {
            const rect = win.getBoundingClientRect();
            const startWidth = rect.width;
            const startHeight = rect.height;
            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = rect.left;
            const startTop = rect.top;

            win.classList.add('resizing');

            function doResize(e) {
                if (!isResizing) return;
                document.body.style.setProperty('cursor', cursorMap[type], 'important');

                if (type.includes('r')) win.style.width = (startWidth + e.clientX - startX) + 'px';
                if (type.includes('b')) win.style.height = (startHeight + e.clientY - startY) + 'px';
                if (type.includes('t')) {
                    const newHeight = startHeight - (e.clientY - startY);
                    if (newHeight > 100) {
                        win.style.height = newHeight + 'px';
                        win.style.top = (startTop + (e.clientY - startY)) + 'px';
                    }
                }
                if (type.includes('l')) {
                    const newWidth = startWidth - (e.clientX - startX);
                    if (newWidth > 200) {
                        win.style.width = newWidth + 'px';
                        win.style.left = (startLeft + (e.clientX - startX)) + 'px';
                    }
                }
            }

            function stopResize() {
                isResizing = false; 
                win.classList.remove('resizing');
                document.body.style.cursor = ''; 

                if (parseInt(win.style.top) < 30) {
                    win.style.width = startWidth + 'px';
                    win.style.height = startHeight + 'px';
                    win.style.top = startTop + 'px';
                    win.style.left = startLeft + 'px';
                }

                window.removeEventListener('mousemove', doResize);
                window.removeEventListener('mouseup', stopResize);
            }
            window.addEventListener('mousemove', doResize);
            window.addEventListener('mouseup', stopResize);
        }
    }
    const allWins = document.querySelectorAll('.calculator, .note, .terminal, .maps, .safari, .settings-app, .music, .appstore, #about-window');
    allWins.forEach(makeResizable);
});

/**************************************************************
 * GESTIÓN DE CAPAS (TRAER AL FRENTE AL HACER CLIC)
 **************************************************************/
let highestZ = 100; 

function focusWindow(win) {
    highestZ++;
    win.style.zIndex = highestZ;
}

document.querySelectorAll('.calculator, .note, .terminal, .maps, .safari, .settings-app, .music, .appstore, #about-window').forEach(win => {
    win.addEventListener('mousedown', () => {
        focusWindow(win);
    });
});

const originalOpenWindow = open_window;
open_window = function(open, point, appName) {
    originalOpenWindow(open, point, appName);
    focusWindow(open);
};

/**************************************************************
 * MAGNIFICACIÓN EN EL DOCK (CORREGIDA)
 **************************************************************/

document.addEventListener('DOMContentLoaded', () => {
  const dock = document.querySelector('.dock');
  const dockIcons = document.querySelectorAll('.dock .icon img');

  const MAX_SCALE = 1.7; 
  const RANGE = 195;    
  const MAX_LIFT = 15; 
  const smoothness = 0.20; 
  let intensities = Array(dockIcons.length).fill(0); 

  function update() {
    dockIcons.forEach((icon, index) => {
      const targetIntensity = icon.dataset.targetIntensity || 0;
      intensities[index] += (targetIntensity - intensities[index]) * smoothness;
      const intensity = intensities[index];
      const scale = 1 + (MAX_SCALE - 1) * intensity;
      const lift = intensity * MAX_LIFT;
      const margin = intensity * 20;
      icon.style.transition = "none"; 
      icon.style.transform = `translateY(-${lift}px) scale(${scale})`;
      icon.style.margin = `0 ${margin}px`;
    });
    requestAnimationFrame(update); 
  }
  requestAnimationFrame(update);

  dock.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    dockIcons.forEach(icon => {
      const rect = icon.getBoundingClientRect();
      const iconCenter = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - iconCenter);
      if (distance < RANGE) {
        const ratio = (RANGE - distance) / RANGE;
        icon.dataset.targetIntensity = ratio;
      } else {
        icon.dataset.targetIntensity = 0;
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    dockIcons.forEach(icon => {
      icon.dataset.targetIntensity = 0;
    });
  });
});
/**************************************************************
 * macOS Tahoe - Logic + Shake to Find
 **************************************************************/
let isDraggingAbout = false; 

document.addEventListener('DOMContentLoaded', () => {
    const aboutBtn = document.getElementById('about-link');
    const aboutWin = document.getElementById('about-window');
    const draggable = document.getElementById('draggable-window');

    if (aboutBtn && aboutWin && draggable) {
        aboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            aboutWin.style.display = 'block';
            draggable.style.top = "50%";
            draggable.style.left = "50%";
            draggable.style.transform = "translate(-50%, -50%)";
            focusWindow(aboutWin);
        });

        let offsetX, offsetY;
        draggable.addEventListener('mousedown', (e) => {
            if (e.target.closest('button')) return;
            isDraggingAbout = true;
            const rect = draggable.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            draggable.style.transform = 'none';
            draggable.style.left = rect.left + 'px';
            draggable.style.top = rect.top + 'px';
            draggable.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDraggingAbout) return;
            draggable.style.left = (e.clientX - offsetX) + 'px';
            draggable.style.top = (e.clientY - offsetY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDraggingAbout = false;
            draggable.style.cursor = 'grab';
        });
    }
});

let lastMouseX = 0;
let lastMouseY = 0;
let lastMouseTime = Date.now();
let cursorTimeout;
let firstMove = true;

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  if (firstMove) {
    lastMouseX = e.pageX; lastMouseY = e.pageY;
    lastMouseTime = currentTime; firstMove = false;
    return;
  }
  const timeDiff = currentTime - lastMouseTime;
  if (timeDiff > 0) {
    const distance = Math.sqrt(Math.pow(e.pageX - lastMouseX, 2) + Math.pow(e.pageY - lastMouseY, 2));
    const speed = (distance / timeDiff) * 100; 
    if (speed > 1500 && !isDraggingAbout) { 
      document.body.classList.add('cursor-big');
    }
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
      document.body.classList.remove('cursor-big');
    }, 500);
  }
  lastMouseX = e.pageX; lastMouseY = e.pageY;
  lastMouseTime = currentTime;
});

function closeAbout() {
    const win = document.getElementById('about-window');
    if (win) win.style.display = 'none';
}

// Spotlight unificado
function handleopen_spotlight(e) {
  if (e) e.stopPropagation();
  const isOpen = elements.spotlight_search.classList.contains("opened");
  closeBatteryPopup();
  if (controlCenterMenu) controlCenterMenu.classList.remove("opened");
  if (isOpen) {
    elements.spotlight_search.classList.remove("opened");
  } else {
    elements.spotlight_search.classList.add("opened");
    const input = elements.spotlight_search.querySelector("input");
    if (input) setTimeout(() => input.focus(), 50);
  }
}

elements.spotlight_search.addEventListener("click", (e) => e.stopPropagation());

// Notes app logic
function handleAdding() {
  const create_input = document.createElement("input");
  create_input.placeholder = "Writing name";
  notesApp.notes.appendChild(create_input);
}
function handleDeleting() {
  const inputChild = document.querySelector(".content__sidebar--notes input");
  if(inputChild) inputChild.remove();
  notesApp.content_typing.style.display = "none";
}
function handleNotes() {
  notesApp.content_typing.style.display = "block";
}

function handleMinimize(Minimize) {
  Minimize.style.maxWidth = "80%";
  Minimize.style.minWidth = "70%";
  Minimize.style.height = "430px";
}

function close_window(close, point, appName) {
  close.style.display = "none";
  point.style.display = "none";
  if(appName) appName.style.display = "none";
}

function open_window(open, point, appName) {
  elements.navbar.style.display = "flex";
  open.style.display = "block"; // VUELVE A BLOCK PARA NO ROMPER NOTAS/TERMINAL
  launchpad.container.style.display = "flex";
  launchpad.window.style.display = "none";
  launchpad.point.style.display = "none";
  if(appName) appName.style.display = "block";
  point.style.display = "block";
  focusWindow(open);
}

// Event Listeners Apps
safariApp.opening.addEventListener("click", () => open_window(safariApp.window, safariApp.point, safariApp.app_name));
safariApp.close.addEventListener("click", () => close_window(safariApp.window, safariApp.point, safariApp.app_name));
settingsApp.opening.addEventListener("click", () => open_window(settingsApp.window, settingsApp.point, settingsApp.app_name));
settingsApp.close.addEventListener("click", () => close_window(settingsApp.window, settingsApp.point, settingsApp.app_name));
musicApp.opening.addEventListener("click", () => open_window(musicApp.window, musicApp.point, musicApp.app_name));
musicApp.close.addEventListener("click", () => close_window(musicApp.window, musicApp.point, musicApp.app_name));

// APP STORE LISTENERS
appStoreApp.opening.addEventListener("click", () => open_window(appStoreApp.window, appStoreApp.point, appStoreApp.app_name));
appStoreApp.close.addEventListener("click", () => close_window(appStoreApp.window, appStoreApp.point, appStoreApp.app_name));

// Launchpad logic
launchpad.opening.addEventListener("click", handleOpenLaunching);
function handleOpenLaunching() {
  if (launchpad.window.style.display === "none") {
    launchpad.window.style.display = "block";
    elements.navbar.style.display = "none";
    launchpad.point.style.display = "block";
  } else {
    launchpad.window.classList.add("launchpad-closing");
    setTimeout(() => {
      launchpad.window.style.display = "none";
      elements.navbar.style.display = "flex";
      launchpad.point.style.display = "none";
      launchpad.window.classList.remove("launchpad-closing");
    }, 300);
  }
}

launchpad.window.addEventListener("click", (e) => {
  if (e.target === launchpad.window || e.target === launchpad.app_container) {
    if (launchpad.window.style.display !== "none") handleOpenLaunching(); 
  }
});
launchpad.searchbox.addEventListener("click", (e) => e.stopPropagation());

function handleLaunchpadSearch(e) {
  for (let app of launchpad.app_container.children) {
    if (e.target.value) {
      app.style.display = "none";
      if (app.dataset.keywords.toLowerCase().includes(e.target.value.toLowerCase())) app.style.display = "flex";
    } else app.style.display = "flex";
  }
}

function handleOpenCal_lunchpad() {
  handleOpenLaunching(); 
  setTimeout(() => {
    calculatorApp.window.style.display = "block";
    calculatorApp.app_name.style.display = "block";
    launchpad.container.style.display = "flex";
    elements.navbar.style.display = "flex";
    calculatorApp.point.style.display = "block";
    centerWindow(calculatorApp.window);
  }, 300);
}

// Generic App listeners
notesApp.adding.addEventListener("click", handleAdding);
terminalApp.close.addEventListener("click", () => close_window(terminalApp.window, terminalApp.point, terminalApp.app_name));
notesApp.close.addEventListener("click", () => close_window(notesApp.window, notesApp.point, notesApp.app_name));
mapsApp.close.addEventListener("click", () => close_window(mapsApp.window, mapsApp.point, mapsApp.app_name));
notesApp.deleting.addEventListener("click", handleDeleting);
notesApp.window.addEventListener("click", handleNotes);
terminalApp.opening.addEventListener("click", () => open_window(terminalApp.window, terminalApp.point, terminalApp.app_name));
notesApp.opening.addEventListener("click", () => open_window(notesApp.window, notesApp.point, notesApp.app_name));
calculatorApp.opening.addEventListener("click", () => {
  open_window(calculatorApp.window, calculatorApp.point, calculatorApp.app_name);
  centerWindow(calculatorApp.window);
});
mapsApp.opening.addEventListener("click", () => open_window(mapsApp.window, mapsApp.point, mapsApp.app_name));
calculatorApp.close.addEventListener("click", () => close_window(calculatorApp.window, calculatorApp.point, calculatorApp.app_name));
calculatorApp.opening_l.addEventListener("click", handleOpenCal_lunchpad);
launchpad.searchbox.addEventListener("input", handleLaunchpadSearch);
elements.clockWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.widgetsPanel.classList.toggle("open");
});

// Calculator Logic
const calculatorButtons = document.querySelectorAll(".input button");
const calculatorDisplay = document.querySelector(".display");
calculatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => calculate(event.target.value, calculatorDisplay));
});
function lastNumber(value) { return value.split(/[\+\-\*\/\%]/).pop(); }
const operators = ["+", "-", "*", "/", "%"];
function calculate(value, display) {
  const latestChar = display.value[display.value.length - 1];
  const isEmpty = display.value === "0";
  const isDecimalLastOperand = lastNumber(display.value).includes(".");
  if (isEmpty && /^[0-9]$/.test(value)) return (display.value = value);
  switch (value) {
    case "=": if (!isEmpty) display.value = eval(display.value); return;
    case ".": if (!isDecimalLastOperand) display.value += "."; return;
    case "C": return (display.value = "0");
    case "+/-": if (!operators.some((op) => display.value.replace(/^-/, "").includes(op))) display.value = -1 * parseFloat(display.value); return;
    case "*": case "/": case "-": case "+": case "%":
      if (operators.includes(latestChar)) return (display.value = display.value.slice(0, -1) + value);
    default: display.value += value;
  }
}

// Dock and Window Dragging
document.addEventListener('DOMContentLoaded', function () {
  const dock = document.querySelector('.dock');
  if (dock) {
    let dragged = null;
    dock.querySelectorAll('.icon').forEach(icon => {
      const labelEl = icon.querySelector('.dock-label');
      const name = labelEl ? labelEl.textContent.trim().toLowerCase() : '';
      if (name === 'downloads' || name === 'trash') {
        icon.setAttribute('draggable', 'false');
        icon.classList.add('static');
        return;
      }
      icon.setAttribute('draggable', 'true');
      icon.addEventListener('dragstart', (e) => { dragged = icon; setTimeout(() => icon.classList.add('dragging'), 0); });
      icon.addEventListener('dragend', () => { icon.classList.remove('dragging'); dragged = null; });
      icon.addEventListener('dragover', (e) => e.preventDefault());
      icon.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragged && dragged !== icon) {
          const icons = Array.from(dock.querySelectorAll('.icon'));
          const dropIndex = icons.indexOf(icon);
          dock.insertBefore(dragged, dropIndex > icons.indexOf(dragged) ? icon.nextSibling : icon);
        }
      });
    });
  }

/**************************************************************
 * SNAPPING LOGIC (CON FIX DE SOLTADO)
 **************************************************************/
if (typeof $ === 'function' && typeof $.fn.draggable === 'function') {
    const snapPreview = document.createElement('div');
    snapPreview.id = 'snap-preview';
    document.body.appendChild(snapPreview);

    let activeSnapSide = null; 

    const applySnap = (win, side) => {
        $(win).removeClass('is-dragging');
        if (!win.classList.contains('window--maximized') && !$(win).hasClass('window--snap-left') && !$(win).hasClass('window--snap-right')) {
            win.dataset.preTop = win.style.top;
            win.dataset.preLeft = win.style.left;
            win.dataset.preWidth = win.style.width;
            win.dataset.preHeight = win.style.height;
        }
        $(win).removeClass('window--snap-left window--snap-right window--maximized');
        
        if (side === 'top') {
            $(win).addClass('window--maximized');
            Object.assign(win.style, { top: "30px", left: "0px", width: "100vw", height: "calc(100vh - 115px)" });
        } else if (side === 'left') {
            $(win).addClass('window--snap-left');
            Object.assign(win.style, { top: "30px", left: "0px", width: "50vw", height: "calc(100vh - 115px)" });
        } else if (side === 'right') {
            $(win).addClass('window--snap-right');
            Object.assign(win.style, { top: "30px", left: "50vw", width: "50vw", height: "calc(100vh - 115px)" });
        }
        snapPreview.style.opacity = '0';
        activeSnapSide = null;
    };

    const baseConfig = {
        start: function(event, ui) { 
            $(this).addClass('is-dragging');
            activeSnapSide = null;
            if ($(this).hasClass('window--maximized') || $(this).hasClass('window--snap-left') || $(this).hasClass('window--snap-right')) {
                const oldWidth = parseInt(this.dataset.preWidth) || 900;
                $(this).removeClass('window--snap-left window--snap-right window--maximized');
                this.style.width = oldWidth + "px";
                this.style.height = (this.dataset.preHeight || "550px");
                ui.position.left = event.pageX - (oldWidth / 2);
            }
        },
        drag: function(event, ui) { 
            if (ui.position.top < 30) ui.position.top = 30;
            const margin = 15;
            
            if (event.pageY < 40) { 
                activeSnapSide = 'top';
                snapPreview.style.display = 'block'; snapPreview.style.left = '0'; snapPreview.style.width = '100%';
                setTimeout(() => snapPreview.style.opacity = '1', 10);
            } else if (event.pageX < margin) { 
                activeSnapSide = 'left';
                snapPreview.style.display = 'block'; snapPreview.style.left = '0'; snapPreview.style.width = '50%';
                setTimeout(() => snapPreview.style.opacity = '1', 10);
            } else if (event.pageX > window.innerWidth - margin) { 
                activeSnapSide = 'right';
                snapPreview.style.display = 'block'; snapPreview.style.left = '50%'; snapPreview.style.width = '50%';
                setTimeout(() => snapPreview.style.opacity = '1', 10);
            } else {
                activeSnapSide = null;
                snapPreview.style.opacity = '0';
            }
        },
        stop: function() { 
            $(this).removeClass('is-dragging');
            if (activeSnapSide) {
                applySnap(this, activeSnapSide);
            }
            snapPreview.style.opacity = '0';
            activeSnapSide = null;
        }
    };

    $(".terminal, .note, .maps, .safari, .music, .appstore").draggable({ ...baseConfig, handle: ".window__taskbar" });
    $(".calculator").draggable({ ...baseConfig, handle: ".calculator__top" });
    $(".settings-app").draggable({ ...baseConfig, handle: ".settings_window__taskbar" });
}
});

// Date Time
const dateElement = document.getElementById("date");
if(dateElement) dateElement.innerHTML = new Date().toDateString();
function digi() {
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ampm = hour >= 12 ? " PM" : " AM";
  hour = hour % 12 || 12;
  if(elements.clockElement) elements.clockElement.innerHTML = (hour < 10 ? "0"+hour : hour) + ":" + minute + ampm;
}

// Terminal line
let terminal_line_html = document.querySelector(".terminal_line") ? document.querySelector(".terminal_line").outerHTML : "";
let path = "~";
let dirs = ["Desktop", "Downloads", "Music", "Documents"];
function init_terminal_line() {
  $(".cursor").unbind("keydown").keydown(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      let command = $(this).text().trim();
      if (!command) return;
      let command_output = "zsh: command not found: " + command + "<br>";
      if (command.startsWith("cd ")) { path = command.substring(3); command_output = ""; }
      else if (command === "ls") command_output = dirs.join("\t");
      else if (command === "pwd") command_output = path + "/";
      $(this).removeAttr("contenteditable").removeClass("cursor");
      terminalApp.content.innerHTML += command_output;
      terminalApp.content.innerHTML += terminal_line_html.replace("~", path);
      placeCaretAtEnd(document.querySelector(".cursor"));
      init_terminal_line();
    }
  });
}
init_terminal_line();
if(terminalApp.content) terminalApp.content.addEventListener("click", () => placeCaretAtEnd(document.querySelector(".cursor")));
function placeCaretAtEnd(el) {
  if(!el) return;
  el.focus();
  var range = document.createRange(); range.selectNodeContents(el);
  range.collapse(false);
  var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
}

// Context Menu
document.oncontextmenu = (e) => {
  e.preventDefault();
  var menu = document.getElementById("contextMenu");
  menu.style.opacity = "1";
  menu.style.left = e.pageX + "px";
  menu.style.top = e.pageY + "px";
};

// Battery and Spotlight Control
const calculateBattery = () => {
  if(navigator.getBattery) {
      navigator.getBattery().then(battery => {
        let number = Math.floor(battery.level * 100);
        elements.batteryText.textContent = `${number}%`;
        elements.batteryProgress.style.width = `${number}%`;
        elements.batteryPopupText.textContent = `${number}%`;
      });
  }
};

const closeBatteryPopup = () => {
  elements.batteryPopup.classList.remove("opened");
  elements.batteryButton.classList.remove("selected");
};

elements.batteryButton.addEventListener("click", (e) => {
  e.stopPropagation(); 
  if(controlCenterMenu) controlCenterMenu.classList.remove("opened");
  elements.spotlight_search.classList.remove("opened");

  elements.batteryPopup.classList.toggle("opened");
  elements.batteryButton.classList.toggle("selected");
});

const controlCenterBtn = document.querySelector(".control-center");
const controlCenterMenu = document.querySelector(".menu__container");

if(controlCenterBtn) {
    controlCenterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeBatteryPopup();
      elements.spotlight_search.classList.remove("opened");
      controlCenterMenu.classList.toggle("opened");
    });
}

if(controlCenterMenu) controlCenterMenu.addEventListener("click", (e) => e.stopPropagation());

elements.open_spotlight.addEventListener("click", handleopen_spotlight);

document.addEventListener("click", () => {
  closeBatteryPopup();
  if(controlCenterMenu) controlCenterMenu.classList.remove("opened");
  elements.spotlight_search.classList.remove("opened");
  elements.widgetsPanel.classList.remove("open");
  
  const ctxMenu = document.getElementById("contextMenu");
  if(ctxMenu) ctxMenu.style.opacity = "0";
});

calculateBattery();
digi();
setInterval(digi, 1000);  close: document.querySelector(".close-cal"),
  backfull: document.querySelector(".min-cal"),
  point: document.querySelector("#point-cal"),
  opening: document.querySelector(".open-cal"),
  opening_l: document.querySelector(".open-cal-lunching"),
};

// Notes App
const notesApp = {
  app_name: document.querySelector("#Notes"),
  window: document.querySelector(".note"),
  full: document.querySelector(".full-note"),
  close: document.querySelector(".close-note"),
  backfull: document.querySelector(".backfull-note"),
  point: document.querySelector("#point-note"),
  adding: document.querySelector(".adding"),
  deleting: document.querySelector(".deleting"),
  content_typing: document.querySelector(".content__typing"),
  opening: document.querySelector(".open-note"),
  notes: document.querySelector(".content__sidebar--notes"),
};

// Terminal App
const terminalApp = {
  app_name: document.querySelector("#Terminal"),
  window: document.querySelector(".terminal"),
  full: document.querySelector(".full"),
  close: document.querySelector(".close"),
  backfull: document.querySelector(".backfull"),
  point: document.querySelector("#point-terminal"),
  content: document.querySelector(".terminal_content"),
  taskbar: document.querySelector(".terminal .window__taskbar"),
  opening: document.querySelector(".open-terminal"),
};

// Maps App
const mapsApp = {
  app_name: document.querySelector("#map"),
  window: document.querySelector(".maps"),
  full: document.querySelector(".maps .full-map"),
  close: document.querySelector(".maps .close-map"),
  backfull: document.querySelector(".maps .backfull-map"),
  point: document.querySelector("#point-maps"),
  opening: document.querySelector(".open-map"),
};

// Safari App
const safariApp = {
  app_name: document.querySelector("#Safari-nav"),
  window: document.querySelector(".safari"),
  full: document.querySelector(".safari .full-map"),
  close: document.querySelector(".safari .close-map"),
  backfull: document.querySelector(".safari .backfull-map"),
  point: document.querySelector("#point-safari"),
  opening: document.querySelector(".open-safari"),
};

// Settings App
const settingsApp = {
  app_name: document.querySelector("#Settings-nav"),
  window: document.querySelector(".settings-app"),
  full: document.querySelector(".settings-app .full-map"),
  close: document.querySelector(".settings-app .close-map"),
  backfull: document.querySelector(".settings-app .backfull-map"),
  point: document.querySelector("#point-settings"),
  opening: document.querySelector(".open-settings"),
};

// Music App
const musicApp = {
  app_name: document.querySelector("#Music-nav"),
  window: document.querySelector(".music"),
  full: document.querySelector(".music .full-map"),
  close: document.querySelector(".music .close-map"),
  backfull: document.querySelector(".music .backfull-map"),
  point: document.querySelector("#point-music"),
  opening: document.querySelector(".open-music"),
};

// App Store App
const appStoreApp = {
  app_name: document.querySelector("#Appstore-nav"),
  window: document.querySelector(".appstore"),
  full: document.querySelector(".appstore .full-appstore"),
  close: document.querySelector(".appstore .close-appstore"),
  backfull: document.querySelector(".appstore .backfull-appstore"),
  point: document.querySelector("#point-appstore"),
  opening: document.querySelector(".open-appstore"),
};


// Launchpad
const launchpad = {
  container: document.querySelector(".container__Window"),
  window: document.querySelector(".launchpad"),
  searchbox: document.querySelector(".launchpad .searchbox"),
  app_container: document.querySelector(".Apps-container"),
  point: document.querySelector("#point-launchpad"),
  opening: document.querySelector(".open-lunchpad"),
};

/********** LISTENERS **********/

// Overlay para atenuar el brillo
let brightnessOverlay;
function createBrightnessOverlay() {
  if (document.getElementById('brightness-overlay')) return;
  brightnessOverlay = document.createElement('div');
  brightnessOverlay.id = 'brightness-overlay';
  brightnessOverlay.style.position = 'fixed';
  brightnessOverlay.style.top = 0;
  brightnessOverlay.style.left = 0;
  brightnessOverlay.style.width = '100vw';
  brightnessOverlay.style.height = '100vh';
  brightnessOverlay.style.pointerEvents = 'none';
  brightnessOverlay.style.zIndex = 99999;
  brightnessOverlay.style.background = 'black';
  brightnessOverlay.style.opacity = '0';
  brightnessOverlay.style.transition = 'opacity 0.2s';
  document.body.appendChild(brightnessOverlay);
}

function updateBrightnessOverlay() {
  if (!elements.brightness_range || !brightnessOverlay) return;
  let val = parseInt(elements.brightness_range.value);
  let opacity = 1 - (val - 20) / 80;
  if (opacity < 0) opacity = 0;
  if (opacity > 1) opacity = 1;
  brightnessOverlay.style.opacity = opacity.toString();
}

document.addEventListener('DOMContentLoaded', () => {
  createBrightnessOverlay();
  if (elements.brightness_range) {
    elements.brightness_range.addEventListener('input', updateBrightnessOverlay);
    updateBrightnessOverlay();
  }
  if (elements.spotlight_search) {
    elements.spotlight_search.classList.remove("opened");
  }
  if (typeof digi === 'function') {
    digi();
  }
});

// Función para centrar cualquier ventana manualmente
function centerWindow(win) {
    const x = (window.innerWidth / 2) - (win.offsetWidth / 2);
    const y = (window.innerHeight / 2) - (win.offsetHeight / 2);
    win.style.left = x + "px";
    win.style.top = y + "px";
}

// --- LÓGICA DE MAXIMIZADO UNIFICADA ---
document.addEventListener('DOMContentLoaded', () => {
    const maximizeButtons = document.querySelectorAll('.full, .full-note, .full-map, .max-cal, .full-appstore');

    maximizeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const win = btn.closest('.calculator, .note, .terminal, .maps, .safari, .settings-app, .music, .appstore, #about-window');
            if (!win) return;

            const isMaximized = win.classList.contains('window--maximized');

            if (isMaximized) {
                // RESTAURAR
                win.classList.remove('window--maximized');
                win.style.top = win.dataset.preTop;
                win.style.left = win.dataset.preLeft;
                win.style.width = win.dataset.preWidth;
                win.style.height = win.dataset.preHeight;
                win.style.transform = win.dataset.preTransform || "none";
            } else {
    // MAXIMIZAR
    const rect = win.getBoundingClientRect();

    if (!win.classList.contains('window--snap-left') && !win.classList.contains('window--snap-right')) {
        win.dataset.preTop = win.style.top || rect.top + "px";
        win.dataset.preLeft = win.style.left || rect.left + "px";
        win.dataset.preWidth = rect.width + "px"; 
        win.dataset.preHeight = rect.height + "px";
        win.dataset.preTransform = win.style.transform || "none";
    }

    const navbarHeight = 30; 
    const dockMargin = 85;   
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight - navbarHeight - dockMargin;

    win.classList.remove('window--snap-left', 'window--snap-right');
    
    win.classList.add('window--maximized');
    win.style.top = navbarHeight + "px";
    win.style.left = "0px";
    win.style.width = availableWidth + "px";
    win.style.height = availableHeight + "px";
    win.style.transform = "none"; 
}
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const excludeList = []; 
    let isResizing = false; 

    function makeResizable(win) {
        if (excludeList.some(sel => win.matches(sel))) return;

        const resizers = ['r', 'b', 'rb', 'l', 'lb', 't', 'tl', 'tr'];
        
        const cursorMap = {
            'r': 'e-resize', 'b': 's-resize', 'l': 'w-resize', 't': 'n-resize',
            'rb': 'se-resize', 'lb': 'sw-resize', 'tl': 'nw-resize', 'tr': 'ne-resize'
        };

        resizers.forEach(type => {
            const resizer = document.createElement('div');
            resizer.className = `resizer ${type}`;
            
            resizer.addEventListener('mouseenter', () => {
                if (!isResizing) document.body.style.setProperty('cursor', cursorMap[type], 'important');
            });
            resizer.addEventListener('mouseleave', () => {
                if (!isResizing) document.body.style.cursor = '';
            });

            resizer.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation(); 
                isResizing = true; 
                win.classList.remove('window--maximized');
                initResize(e, type, win);
            });
            win.appendChild(resizer);
        });

        function initResize(e, type, win) {
            const rect = win.getBoundingClientRect();
            const startWidth = rect.width;
            const startHeight = rect.height;
            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = rect.left;
            const startTop = rect.top;

            win.classList.add('resizing');

            function doResize(e) {
                if (!isResizing) return;
                document.body.style.setProperty('cursor', cursorMap[type], 'important');

                if (type.includes('r')) win.style.width = (startWidth + e.clientX - startX) + 'px';
                if (type.includes('b')) win.style.height = (startHeight + e.clientY - startY) + 'px';
                if (type.includes('t')) {
                    const newHeight = startHeight - (e.clientY - startY);
                    if (newHeight > 100) {
                        win.style.height = newHeight + 'px';
                        win.style.top = (startTop + (e.clientY - startY)) + 'px';
                    }
                }
                if (type.includes('l')) {
                    const newWidth = startWidth - (e.clientX - startX);
                    if (newWidth > 200) {
                        win.style.width = newWidth + 'px';
                        win.style.left = (startLeft + (e.clientX - startX)) + 'px';
                    }
                }
            }

            function stopResize() {
                isResizing = false; 
                win.classList.remove('resizing');
                document.body.style.cursor = ''; 

                if (parseInt(win.style.top) < 30) {
                    win.style.width = startWidth + 'px';
                    win.style.height = startHeight + 'px';
                    win.style.top = startTop + 'px';
                    win.style.left = startLeft + 'px';
                }

                window.removeEventListener('mousemove', doResize);
                window.removeEventListener('mouseup', stopResize);
            }
            window.addEventListener('mousemove', doResize);
            window.addEventListener('mouseup', stopResize);
        }
    }
    const allWins = document.querySelectorAll('.calculator, .note, .terminal, .maps, .safari, .settings-app, .music, .appstore, #about-window');
    allWins.forEach(makeResizable);
});

/**************************************************************
 * GESTIÓN DE CAPAS (TRAER AL FRENTE AL HACER CLIC)
 **************************************************************/
let highestZ = 100; 

function focusWindow(win) {
    highestZ++;
    win.style.zIndex = highestZ;
}

document.querySelectorAll('.calculator, .note, .terminal, .maps, .safari, .settings-app, .music, .appstore, #about-window').forEach(win => {
    win.addEventListener('mousedown', () => {
        focusWindow(win);
    });
});

const originalOpenWindow = open_window;
open_window = function(open, point, appName) {
    originalOpenWindow(open, point, appName);
    focusWindow(open);
};

/**************************************************************
 * MAGNIFICACIÓN EN EL DOCK (CORREGIDA)
 **************************************************************/

document.addEventListener('DOMContentLoaded', () => {
  const dock = document.querySelector('.dock');
  const dockIcons = document.querySelectorAll('.dock .icon img');

  const MAX_SCALE = 1.7; 
  const RANGE = 195;    
  const MAX_LIFT = 15; 
  const smoothness = 0.20; 
  let intensities = Array(dockIcons.length).fill(0); 

  function update() {
    dockIcons.forEach((icon, index) => {
      const targetIntensity = icon.dataset.targetIntensity || 0;
      intensities[index] += (targetIntensity - intensities[index]) * smoothness;
      const intensity = intensities[index];
      const scale = 1 + (MAX_SCALE - 1) * intensity;
      const lift = intensity * MAX_LIFT;
      const margin = intensity * 20;
      icon.style.transition = "none"; 
      icon.style.transform = `translateY(-${lift}px) scale(${scale})`;
      icon.style.margin = `0 ${margin}px`;
    });
    requestAnimationFrame(update); 
  }
  requestAnimationFrame(update);

  dock.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    dockIcons.forEach(icon => {
      const rect = icon.getBoundingClientRect();
      const iconCenter = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - iconCenter);
      if (distance < RANGE) {
        const ratio = (RANGE - distance) / RANGE;
        icon.dataset.targetIntensity = ratio;
      } else {
        icon.dataset.targetIntensity = 0;
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    dockIcons.forEach(icon => {
      icon.dataset.targetIntensity = 0;
    });
  });
});
/**************************************************************
 * macOS Tahoe - Logic + Shake to Find
 **************************************************************/
let isDraggingAbout = false; 

document.addEventListener('DOMContentLoaded', () => {
    const aboutBtn = document.getElementById('about-link');
    const aboutWin = document.getElementById('about-window');
    const draggable = document.getElementById('draggable-window');

    if (aboutBtn && aboutWin && draggable) {
        aboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            aboutWin.style.display = 'block';
            draggable.style.top = "50%";
            draggable.style.left = "50%";
            draggable.style.transform = "translate(-50%, -50%)";
            focusWindow(aboutWin);
        });

        let offsetX, offsetY;
        draggable.addEventListener('mousedown', (e) => {
            if (e.target.closest('button')) return;
            isDraggingAbout = true;
            const rect = draggable.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            draggable.style.transform = 'none';
            draggable.style.left = rect.left + 'px';
            draggable.style.top = rect.top + 'px';
            draggable.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDraggingAbout) return;
            draggable.style.left = (e.clientX - offsetX) + 'px';
            draggable.style.top = (e.clientY - offsetY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDraggingAbout = false;
            draggable.style.cursor = 'grab';
        });
    }
});

let lastMouseX = 0;
let lastMouseY = 0;
let lastMouseTime = Date.now();
let cursorTimeout;
let firstMove = true;

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  if (firstMove) {
    lastMouseX = e.pageX; lastMouseY = e.pageY;
    lastMouseTime = currentTime; firstMove = false;
    return;
  }
  const timeDiff = currentTime - lastMouseTime;
  if (timeDiff > 0) {
    const distance = Math.sqrt(Math.pow(e.pageX - lastMouseX, 2) + Math.pow(e.pageY - lastMouseY, 2));
    const speed = (distance / timeDiff) * 100; 
    if (speed > 1500 && !isDraggingAbout) { 
      document.body.classList.add('cursor-big');
    }
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
      document.body.classList.remove('cursor-big');
    }, 500);
  }
  lastMouseX = e.pageX; lastMouseY = e.pageY;
  lastMouseTime = currentTime;
});

function closeAbout() {
    const win = document.getElementById('about-window');
    if (win) win.style.display = 'none';
}

// Spotlight unificado
function handleopen_spotlight(e) {
  if (e) e.stopPropagation();
  const isOpen = elements.spotlight_search.classList.contains("opened");
  closeBatteryPopup();
  if (controlCenterMenu) controlCenterMenu.classList.remove("opened");
  if (isOpen) {
    elements.spotlight_search.classList.remove("opened");
  } else {
    elements.spotlight_search.classList.add("opened");
    const input = elements.spotlight_search.querySelector("input");
    if (input) setTimeout(() => input.focus(), 50);
  }
}

elements.spotlight_search.addEventListener("click", (e) => e.stopPropagation());

// Notes app logic
function handleAdding() {
  const create_input = document.createElement("input");
  create_input.placeholder = "Writing name";
  notesApp.notes.appendChild(create_input);
}
function handleDeleting() {
  const inputChild = document.querySelector(".content__sidebar--notes input");
  if(inputChild) inputChild.remove();
  notesApp.content_typing.style.display = "none";
}
function handleNotes() {
  notesApp.content_typing.style.display = "block";
}

function handleMinimize(Minimize) {
  Minimize.style.maxWidth = "80%";
  Minimize.style.minWidth = "70%";
  Minimize.style.height = "430px";
}

function close_window(close, point, appName) {
  close.style.display = "none";
  point.style.display = "none";
  if(appName) appName.style.display = "none";
}

function open_window(open, point, appName) {
  elements.navbar.style.display = "flex";
  open.style.display = "block"; // VUELVE A BLOCK PARA NO ROMPER NOTAS/TERMINAL
  launchpad.container.style.display = "flex";
  launchpad.window.style.display = "none";
  launchpad.point.style.display = "none";
  if(appName) appName.style.display = "block";
  point.style.display = "block";
  focusWindow(open);
}

// Event Listeners Apps
safariApp.opening.addEventListener("click", () => open_window(safariApp.window, safariApp.point, safariApp.app_name));
safariApp.close.addEventListener("click", () => close_window(safariApp.window, safariApp.point, safariApp.app_name));
settingsApp.opening.addEventListener("click", () => open_window(settingsApp.window, settingsApp.point, settingsApp.app_name));
settingsApp.close.addEventListener("click", () => close_window(settingsApp.window, settingsApp.point, settingsApp.app_name));
musicApp.opening.addEventListener("click", () => open_window(musicApp.window, musicApp.point, musicApp.app_name));
musicApp.close.addEventListener("click", () => close_window(musicApp.window, musicApp.point, musicApp.app_name));

// APP STORE LISTENERS
appStoreApp.opening.addEventListener("click", () => open_window(appStoreApp.window, appStoreApp.point, appStoreApp.app_name));
appStoreApp.close.addEventListener("click", () => close_window(appStoreApp.window, appStoreApp.point, appStoreApp.app_name));

// Launchpad logic
launchpad.opening.addEventListener("click", handleOpenLaunching);
function handleOpenLaunching() {
  if (launchpad.window.style.display === "none") {
    launchpad.window.style.display = "block";
    elements.navbar.style.display = "none";
    launchpad.point.style.display = "block";
  } else {
    launchpad.window.classList.add("launchpad-closing");
    setTimeout(() => {
      launchpad.window.style.display = "none";
      elements.navbar.style.display = "flex";
      launchpad.point.style.display = "none";
      launchpad.window.classList.remove("launchpad-closing");
    }, 300);
  }
}

launchpad.window.addEventListener("click", (e) => {
  if (e.target === launchpad.window || e.target === launchpad.app_container) {
    if (launchpad.window.style.display !== "none") handleOpenLaunching(); 
  }
});
launchpad.searchbox.addEventListener("click", (e) => e.stopPropagation());

function handleLaunchpadSearch(e) {
  for (let app of launchpad.app_container.children) {
    if (e.target.value) {
      app.style.display = "none";
      if (app.dataset.keywords.toLowerCase().includes(e.target.value.toLowerCase())) app.style.display = "flex";
    } else app.style.display = "flex";
  }
}

function handleOpenCal_lunchpad() {
  handleOpenLaunching(); 
  setTimeout(() => {
    calculatorApp.window.style.display = "block";
    calculatorApp.app_name.style.display = "block";
    launchpad.container.style.display = "flex";
    elements.navbar.style.display = "flex";
    calculatorApp.point.style.display = "block";
    centerWindow(calculatorApp.window);
  }, 300);
}

// Generic App listeners
notesApp.adding.addEventListener("click", handleAdding);
terminalApp.close.addEventListener("click", () => close_window(terminalApp.window, terminalApp.point, terminalApp.app_name));
notesApp.close.addEventListener("click", () => close_window(notesApp.window, notesApp.point, notesApp.app_name));
mapsApp.close.addEventListener("click", () => close_window(mapsApp.window, mapsApp.point, mapsApp.app_name));
notesApp.deleting.addEventListener("click", handleDeleting);
notesApp.window.addEventListener("click", handleNotes);
terminalApp.opening.addEventListener("click", () => open_window(terminalApp.window, terminalApp.point, terminalApp.app_name));
notesApp.opening.addEventListener("click", () => open_window(notesApp.window, notesApp.point, notesApp.app_name));
calculatorApp.opening.addEventListener("click", () => {
  open_window(calculatorApp.window, calculatorApp.point, calculatorApp.app_name);
  centerWindow(calculatorApp.window);
});
mapsApp.opening.addEventListener("click", () => open_window(mapsApp.window, mapsApp.point, mapsApp.app_name));
calculatorApp.close.addEventListener("click", () => close_window(calculatorApp.window, calculatorApp.point, calculatorApp.app_name));
calculatorApp.opening_l.addEventListener("click", handleOpenCal_lunchpad);
launchpad.searchbox.addEventListener("input", handleLaunchpadSearch);
elements.clockWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.widgetsPanel.classList.toggle("open");
});

// Calculator Logic
const calculatorButtons = document.querySelectorAll(".input button");
const calculatorDisplay = document.querySelector(".display");
calculatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => calculate(event.target.value, calculatorDisplay));
});
function lastNumber(value) { return value.split(/[\+\-\*\/\%]/).pop(); }
const operators = ["+", "-", "*", "/", "%"];
function calculate(value, display) {
  const latestChar = display.value[display.value.length - 1];
  const isEmpty = display.value === "0";
  const isDecimalLastOperand = lastNumber(display.value).includes(".");
  if (isEmpty && /^[0-9]$/.test(value)) return (display.value = value);
  switch (value) {
    case "=": if (!isEmpty) display.value = eval(display.value); return;
    case ".": if (!isDecimalLastOperand) display.value += "."; return;
    case "C": return (display.value = "0");
    case "+/-": if (!operators.some((op) => display.value.replace(/^-/, "").includes(op))) display.value = -1 * parseFloat(display.value); return;
    case "*": case "/": case "-": case "+": case "%":
      if (operators.includes(latestChar)) return (display.value = display.value.slice(0, -1) + value);
    default: display.value += value;
  }
}

// Dock and Window Dragging
document.addEventListener('DOMContentLoaded', function () {
  const dock = document.querySelector('.dock');
  if (dock) {
    let dragged = null;
    dock.querySelectorAll('.icon').forEach(icon => {
      const labelEl = icon.querySelector('.dock-label');
      const name = labelEl ? labelEl.textContent.trim().toLowerCase() : '';
      if (name === 'downloads' || name === 'trash') {
        icon.setAttribute('draggable', 'false');
        icon.classList.add('static');
        return;
      }
      icon.setAttribute('draggable', 'true');
      icon.addEventListener('dragstart', (e) => { dragged = icon; setTimeout(() => icon.classList.add('dragging'), 0); });
      icon.addEventListener('dragend', () => { icon.classList.remove('dragging'); dragged = null; });
      icon.addEventListener('dragover', (e) => e.preventDefault());
      icon.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragged && dragged !== icon) {
          const icons = Array.from(dock.querySelectorAll('.icon'));
          const dropIndex = icons.indexOf(icon);
          dock.insertBefore(dragged, dropIndex > icons.indexOf(dragged) ? icon.nextSibling : icon);
        }
      });
    });
  }

/**************************************************************
 * SNAPPING LOGIC (CON FIX DE SOLTADO)
 **************************************************************/
if (typeof $ === 'function' && typeof $.fn.draggable === 'function') {
    const snapPreview = document.createElement('div');
    snapPreview.id = 'snap-preview';
    document.body.appendChild(snapPreview);

    let activeSnapSide = null; 

    const applySnap = (win, side) => {
        $(win).removeClass('is-dragging');
        if (!win.classList.contains('window--maximized') && !$(win).hasClass('window--snap-left') && !$(win).hasClass('window--snap-right')) {
            win.dataset.preTop = win.style.top;
            win.dataset.preLeft = win.style.left;
            win.dataset.preWidth = win.style.width;
            win.dataset.preHeight = win.style.height;
        }
        $(win).removeClass('window--snap-left window--snap-right window--maximized');
        
        if (side === 'top') {
            $(win).addClass('window--maximized');
            Object.assign(win.style, { top: "30px", left: "0px", width: "100vw", height: "calc(100vh - 115px)" });
        } else if (side === 'left') {
            $(win).addClass('window--snap-left');
            Object.assign(win.style, { top: "30px", left: "0px", width: "50vw", height: "calc(100vh - 115px)" });
        } else if (side === 'right') {
            $(win).addClass('window--snap-right');
            Object.assign(win.style, { top: "30px", left: "50vw", width: "50vw", height: "calc(100vh - 115px)" });
        }
        snapPreview.style.opacity = '0';
        activeSnapSide = null;
    };

    const baseConfig = {
        start: function(event, ui) { 
            $(this).addClass('is-dragging');
            activeSnapSide = null;
            if ($(this).hasClass('window--maximized') || $(this).hasClass('window--snap-left') || $(this).hasClass('window--snap-right')) {
                const oldWidth = parseInt(this.dataset.preWidth) || 900;
                $(this).removeClass('window--snap-left window--snap-right window--maximized');
                this.style.width = oldWidth + "px";
                this.style.height = (this.dataset.preHeight || "550px");
                ui.position.left = event.pageX - (oldWidth / 2);
            }
        },
        drag: function(event, ui) { 
            if (ui.position.top < 30) ui.position.top = 30;
            const margin = 15;
            
            if (event.pageY < 40) { 
                activeSnapSide = 'top';
                snapPreview.style.display = 'block'; snapPreview.style.left = '0'; snapPreview.style.width = '100%';
                setTimeout(() => snapPreview.style.opacity = '1', 10);
            } else if (event.pageX < margin) { 
                activeSnapSide = 'left';
                snapPreview.style.display = 'block'; snapPreview.style.left = '0'; snapPreview.style.width = '50%';
                setTimeout(() => snapPreview.style.opacity = '1', 10);
            } else if (event.pageX > window.innerWidth - margin) { 
                activeSnapSide = 'right';
                snapPreview.style.display = 'block'; snapPreview.style.left = '50%'; snapPreview.style.width = '50%';
                setTimeout(() => snapPreview.style.opacity = '1', 10);
            } else {
                activeSnapSide = null;
                snapPreview.style.opacity = '0';
            }
        },
        stop: function() { 
            $(this).removeClass('is-dragging');
            if (activeSnapSide) {
                applySnap(this, activeSnapSide);
            }
            snapPreview.style.opacity = '0';
            activeSnapSide = null;
        }
    };

    $(".terminal, .note, .maps, .safari, .music, .appstore").draggable({ ...baseConfig, handle: ".window__taskbar" });
    $(".calculator").draggable({ ...baseConfig, handle: ".calculator__top" });
    $(".settings-app").draggable({ ...baseConfig, handle: ".settings_window__taskbar" });
}
});

// Date Time
const dateElement = document.getElementById("date");
if(dateElement) dateElement.innerHTML = new Date().toDateString();
function digi() {
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ampm = hour >= 12 ? " PM" : " AM";
  hour = hour % 12 || 12;
  if(elements.clockElement) elements.clockElement.innerHTML = (hour < 10 ? "0"+hour : hour) + ":" + minute + ampm;
}

// Terminal line
let terminal_line_html = document.querySelector(".terminal_line") ? document.querySelector(".terminal_line").outerHTML : "";
let path = "~";
let dirs = ["Desktop", "Downloads", "Music", "Documents"];
function init_terminal_line() {
  $(".cursor").unbind("keydown").keydown(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      let command = $(this).text().trim();
      if (!command) return;
      let command_output = "zsh: command not found: " + command + "<br>";
      if (command.startsWith("cd ")) { path = command.substring(3); command_output = ""; }
      else if (command === "ls") command_output = dirs.join("\t");
      else if (command === "pwd") command_output = path + "/";
      $(this).removeAttr("contenteditable").removeClass("cursor");
      terminalApp.content.innerHTML += command_output;
      terminalApp.content.innerHTML += terminal_line_html.replace("~", path);
      placeCaretAtEnd(document.querySelector(".cursor"));
      init_terminal_line();
    }
  });
}
init_terminal_line();
if(terminalApp.content) terminalApp.content.addEventListener("click", () => placeCaretAtEnd(document.querySelector(".cursor")));
function placeCaretAtEnd(el) {
  if(!el) return;
  el.focus();
  var range = document.createRange(); range.selectNodeContents(el);
  range.collapse(false);
  var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
}

// Context Menu
document.oncontextmenu = (e) => {
  e.preventDefault();
  var menu = document.getElementById("contextMenu");
  menu.style.opacity = "1";
  menu.style.left = e.pageX + "px";
  menu.style.top = e.pageY + "px";
};

// Battery and Spotlight Control
const calculateBattery = () => {
  if(navigator.getBattery) {
      navigator.getBattery().then(battery => {
        let number = Math.floor(battery.level * 100);
        elements.batteryText.textContent = `${number}%`;
        elements.batteryProgress.style.width = `${number}%`;
        elements.batteryPopupText.textContent = `${number}%`;
      });
  }
};

const closeBatteryPopup = () => {
  elements.batteryPopup.classList.remove("opened");
  elements.batteryButton.classList.remove("selected");
};

elements.batteryButton.addEventListener("click", (e) => {
  e.stopPropagation(); 
  if(controlCenterMenu) controlCenterMenu.classList.remove("opened");
  elements.spotlight_search.classList.remove("opened");

  elements.batteryPopup.classList.toggle("opened");
  elements.batteryButton.classList.toggle("selected");
});

const controlCenterBtn = document.querySelector(".control-center");
const controlCenterMenu = document.querySelector(".menu__container");

if(controlCenterBtn) {
    controlCenterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeBatteryPopup();
      elements.spotlight_search.classList.remove("opened");
      controlCenterMenu.classList.toggle("opened");
    });
}

if(controlCenterMenu) controlCenterMenu.addEventListener("click", (e) => e.stopPropagation());

elements.open_spotlight.addEventListener("click", handleopen_spotlight);

document.addEventListener("click", () => {
  closeBatteryPopup();
  if(controlCenterMenu) controlCenterMenu.classList.remove("opened");
  elements.spotlight_search.classList.remove("opened");
  elements.widgetsPanel.classList.remove("open");
  
  const ctxMenu = document.getElementById("contextMenu");
  if(ctxMenu) ctxMenu.style.opacity = "0";
});

calculateBattery();
digi();
setInterval(digi, 1000);
