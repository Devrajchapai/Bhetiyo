FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Vite usually runs on 5173
EXPOSE 5173

# Vite needs the --host flag to work inside Docker
CMD ["npm", "run", "dev", "--", "--host"]