# Verwende ein leichtgewichtiges Node.js-Image
FROM node:22-alpine

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die package.json und package-lock.json (falls vorhanden)
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install --production

# Kopiere den Rest des Codes
COPY . .

# Exponiere den Port, auf dem die App läuft
EXPOSE 3000

# Starte die App
CMD ["npm", "start"]
