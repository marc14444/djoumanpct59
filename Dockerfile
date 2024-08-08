# Utiliser une image de base pour nginx
FROM nginx:alpine

# Supprimer la page par défaut de nginx
RUN rm /usr/share/nginx/html/*

# Copier les fichiers statiques dans le répertoire de travail de nginx
COPY . /usr/share/nginx/html

# Exposer le port sur lequel nginx va écouter
EXPOSE 80

# Commande pour lancer nginx
CMD ["nginx", "-g", "daemon off;"]
