# Usa una imagen base que incluya Node.js
FROM node:alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json e instala las dependencias
COPY package.json .
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN npm run build

# Expón el puerto 3000 (el puerto predeterminado para React)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]