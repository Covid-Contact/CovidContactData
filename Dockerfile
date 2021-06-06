# Stage 1
FROM node:14.15.4 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2
FROM nginx
COPY --from=node /app/dist/CovidContactData /usr/share/nginx/html
