import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/api/nodos/chatbot', (req, res) => {
  res.json({
    tipo: "Chatbot",
    campos: [
      { nombre: "canal", tipo: "select", opciones: ["WhatsApp", "Instagram"], requerido: true },
      { nombre: "mensaje_bienvenida", tipo: "textarea", requerido: true }
    ],
    acciones: [
      {
        si: { campo: "canal", valor: "WhatsApp" },
        entonces: { crear_nodo: "Seguimiento" }
      }
    ]
  });
});

app.get('/api/nodos/seguimiento', (req, res) => {
  res.json({
    tipo: "Seguimiento",
    campos: [
      { nombre: "etapa_destino", tipo: "select", opciones: ["Nuevo", "Interesado", "En negociación"], requerido: true, dispara_nodo: true },
      { nombre: "tiempo_espera", tipo: "number", unidad: "días", requerido: true },
      { nombre: "mensaje", tipo: "textarea", requerido: false }
    ],
    condicionales: [
      {
        si: { campo: "etapa_destino", valor: "En negociación" },
        entonces: { mostrar: ["mensaje"] }
      }
    ]
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend corriendo en puerto ${port}`));
