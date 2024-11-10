FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server {' > /etc/nginx/conf.d/nginx.conf
RUN echo '    listen 80;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    server_name localhost;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    index index.html index.htm;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    location / {' >> /etc/nginx/conf.d/nginx.conf
RUN echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    }' >> /etc/nginx/conf.d/nginx.conf
RUN echo '}' >> /etc/nginx/conf.d/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
