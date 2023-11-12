# Build stage
FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm i --loglevel verbose
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /app
COPY --from=build /app/dist ./
ENV NODE_ENV=production
USER root
RUN npm install --only=production
RUN apk add --no-cache curl bash
RUN curl -L https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh -o /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
USER node
CMD /wait-for-it.sh postgres:5432 -- npm run typeorm:migrate:prod && npm start