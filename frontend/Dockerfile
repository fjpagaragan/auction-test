FROM node:16-alpine AS node_image

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./ .

RUN npm install

EXPOSE 3000
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install -g concurrently 
RUN npx tailwindcss -i ./src/styles/tailwind_input.css o ./src/styles/style.css
RUN npx next build

CMD npx next start