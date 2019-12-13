ARG NODE_VERSION

FROM node:${NODE_VERSION}

RUN apk add --no-cache su-exec && \
    addgroup bar && \
    adduser -D -h /home -s /bin/sh -G bar foo

ADD entrypoint.sh /entrypoint

ENTRYPOINT ["/entrypoint"]