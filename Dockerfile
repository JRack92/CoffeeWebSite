# --- ETAPA 1: BUILD ---
# Usamos una imagen de Node oficial
FROM node:lts-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo los archivos de dependencias primero (para aprovechar caché de Docker)
COPY package.json package-lock.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el resto del código fuente
COPY . .

# Construimos el sitio (esto genera la carpeta /app/dist con tu HTML)
RUN npm run build

# --- ETAPA 2: RUN ---
# Usamos Nginx Alpine (super ligero)
FROM nginx:alpine

# Copiamos nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos SOLO los archivos construidos en la etapa anterior
# Nota: En Astro 5 a veces la carpeta se llama 'dist' por defecto.
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]