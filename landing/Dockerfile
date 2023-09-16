# Usa una imagen base que incluya un servidor web
FROM nginx:alpine

# Copia los archivos de tu proyecto al directorio de trabajo de nginx
COPY assets /usr/share/nginx/html/assets
COPY images /usr/share/nginx/html/images
COPY index.html /usr/share/nginx/html

# Expón el puerto 80 (el puerto predeterminado para HTTP)
EXPOSE 80

# Comando para iniciar el servidor
CMD ["nginx", "-g", "daemon off;"]
