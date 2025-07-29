FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

# 🔧 Fix permission for nodemon
RUN chmod +x ./node_modules/.bin/nodemon

COPY . .

ENV PORT=5000
EXPOSE $PORT

CMD ["npx", "nodemon", "back-end/index.js"]
