##################################################
# BUILDER CONTAINER
##################################################

FROM node:12.18.4-alpine3.9 as builder

USER root
WORKDIR /usr/src/build

COPY public public
COPY src src
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY webpack.config.js webpack.config.js

RUN npm install
RUN npm run allCleanBuild

##################################################
# FINAL CONTAINER
##################################################

FROM node:12.18.4-alpine3.9

USER root
WORKDIR /usr/src/app

COPY --from=builder /usr/src/build/dist/public public
COPY --from=builder /usr/src/build/dist/ga4gh-starter-kit-ui.js ga4gh-starter-kit-ui.js

ENTRYPOINT [ "node", "ga4gh-starter-kit-ui.js" ]