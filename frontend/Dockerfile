FROM node:18-alpine

WORKDIR /app

# Instalacja zależności
COPY package*.json ./
RUN npm install

# Kopiowanie kodu źródłowego
COPY . .

# Ekspozycja portu
EXPOSE 3000

# Ustawienie zmiennych środowiskowych dla trybu deweloperskiego
ENV WDS_SOCKET_PORT=0
ENV CHOKIDAR_USEPOLLING=true

# Uruchomienie aplikacji w trybie deweloperskim
CMD ["npm", "start"] 