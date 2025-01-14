# Multi Stage build process


# Build Stage

FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm install

# RUN npm install --production

COPY . .

RUN npm run build

# Production Stage

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=base /app/build ./build

COPY package.json package-lock.json ./

ENV NODE_ENV=production

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
