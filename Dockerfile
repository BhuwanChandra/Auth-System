
# Build react client
FROM alpine:latest as client

RUN apk add --no-cache nodejs npm

WORKDIR /app/client/

COPY client/package*.json ./

RUN npm install

COPY client/ ./

RUN ls

RUN npm run build


# Build server
FROM alpine:latest as server

RUN apk add --no-cache nodejs npm

WORKDIR /app/

COPY . ./

COPY --from=client /app/client/build/ ./client/build/

RUN ls

RUN npm install -qy

ENV PORT 8080

EXPOSE 8080

CMD ["npm","start"]
