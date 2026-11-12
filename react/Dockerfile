# --- Etapa 1: Build de la app con Node.js ---
FROM node:20-alpine AS build

WORKDIR /app

# Copiar manifiestos de dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del código y compilar la app con Vite
COPY . .
RUN npm run build

# --- Etapa 2: Servir los estáticos con Nginx ---
FROM nginx:alpine

# Copiar los archivos compilados de Vite al directorio público de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx para manejar rutas de React Router (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
