# Utiliser une image nginx stable comme base
FROM nginx:stable-alpine

# Supprimer le fichier de configuration par défaut de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copier le fichier index.html dans le conteneur Nginx
COPY ./index.html /usr/share/nginx/html/index.html

# Exposer le port 80 pour que Nginx puisse servir votre application
EXPOSE 80

# Commande à exécuter lorsque le conteneur démarre
CMD ["nginx", "-g", "daemon off;"]
