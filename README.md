# 💱 Conversor de Monedas

Conversor de monedas simple hecho con Vite + React + TypeScript, como proyecto de práctica.

## 🚀 Demo

[Ver la app en vivo](https://conversor-moneda-cae.netlify.app/) 

## 🛠️ Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/) + TypeScript
- [Frankfurter API](https://frankfurter.dev/) para las tasas de cambio (sin API key)
- Deploy en [Netlify](https://netlify.com)

## ✨ Funcionalidades

- Conversión entre múltiples monedas (USD, EUR, ARS, CLP, BRL, GBP, JPY)
- Botón de intercambio rápido entre moneda origen/destino
- Diseño responsive
- Manejo de estados de carga y error

## 📦 Instalación local

\`\`\`bash
git clone https://github.com/angelcarballeira/conversor-monedas
cd conversor-monedas
npm install
npm run dev
\`\`\`

## 🏗️ Build de producción

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 📝 Notas

Este proyecto usa la [Frankfurter API v2](https://frankfurter.dev/), gratuita y sin necesidad de API key, que agrega tasas de más de 80 fuentes/bancos centrales.