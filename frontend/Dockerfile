FROM node:18-alpine
LABEL authors="Coulibaly"
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]