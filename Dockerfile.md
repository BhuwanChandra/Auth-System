FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY . /app

RUN npm install

RUN ls

RUN npm run heroku-postbuild

EXPOSE 8080

# ENTRYPOINT ["node"]

CMD ["npm","start"]
