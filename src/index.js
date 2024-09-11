// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import App from './App'; // Importa App en lugar de los componentes individuales
import './i18n'; // Importa la configuración de i18n

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
