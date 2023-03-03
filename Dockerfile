FROM docker.io/node:alpine AS builder

RUN apk add git

COPY . /chainbridge
WORKDIR /chainbridge

RUN yarn cache clean
RUN yarn install --update-checksums 
RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

FROM docker.io/busybox:latest

EXPOSE 3000
COPY --from=builder /chainbridge/dist /dist
RUN echo "E404:index.html" > /etc/httpd.conf
ENTRYPOINT ["httpd", "-f", "-p", "0.0.0.0:3000", "-h", "/dist", "-c", "/etc/httpd.conf"]
