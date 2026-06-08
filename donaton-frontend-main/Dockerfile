# ==========================================
# Etapa 1: Construcción (Build)
# Usamos Node.js para instalar dependencias y compilar Vite
# ==========================================
FROM node:20-alpine AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo los archivos de dependencias primero (optimiza el caché de Docker)
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Compilamos la aplicación para producción (esto genera la carpeta /dist)
RUN npm run build


# ==========================================
# Etapa 2: Servidor (Producción)
# Usamos Nginx, un servidor web ultra ligero, para servir los archivos
# ==========================================
FROM nginx:alpine

# Copiamos nuestra configuración especial para React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos compilados de la Etapa 1 a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (por donde escucha Nginx por defecto)
EXPOSE 80

# Encendemos el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]