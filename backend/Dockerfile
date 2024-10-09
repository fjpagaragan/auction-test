FROM node:16-alpine AS node_image
ARG PORT=3030
ARG ENV=local
ENV NODE_ENV=${ENV}

WORKDIR /app
COPY ./ .
RUN npm install --legacy-peer-deps

EXPOSE 3030
CMD npm run start:docker
