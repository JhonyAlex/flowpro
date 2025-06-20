// Servidor Express para exponer los nodos desde archivos JSON
// Se busca mantener el código modular y legible

const express = require('express');
const fs = require('fs');
const path = require('path');

// Configuración centralizada
const CONFIG = {
  PORT: process.env.PORT || 3000,
  CONFIG_DIR: path.join(__dirname, 'config'),
};

/**
 * Lee y parsea un archivo JSON de configuración.
 * @param {string} filename Nombre del archivo dentro del directorio de config
 * @returns {object|null} Objeto con la configuración o null si falla
 */
function leerConfig(filename) {
  try {
    const ruta = path.join(CONFIG.CONFIG_DIR, filename);
    const contenido = fs.readFileSync(ruta, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error(`Error al leer ${filename}:`, error.message);
    return null;
  }
}

/**
 * Crea y configura la aplicación Express
 * @returns {express.Application}
 */
function crearServidor() {
  const app = express();

  app.get('/config/:nodo', (req, res) => {
    const nombreArchivo = `nodo${req.params.nodo}.json`;
    const datos = leerConfig(nombreArchivo);
    if (datos) {
      res.json(datos);
    } else {
      res.status(404).json({ error: 'Configuración no encontrada' });
    }
  });

  return app;
}

// Inicialización del servidor
const app = crearServidor();
app.listen(CONFIG.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${CONFIG.PORT}`);
});
