FROM alpine:3.18
WORKDIR /app
COPY . . 
RUN npm install --omit=dev
RUN npm run build
