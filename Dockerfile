# ÉTAPE 1 : Le Build
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ÉTAPE 2 : La Production
# On repart d'une image Nginx minuscule (environ 20 Mo)
FROM nginx:stable-alpine as production-stage
# On copie uniquement les fichiers compilés de l'étape précédente
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]