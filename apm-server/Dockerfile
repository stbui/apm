FROM node

MAINTAINER stbui <stbui@stbui.com>

WORKDIR /www
ENV NPM_CONFIG_LOGLEVEL warn
ENV NPM_CONFIG_REGISTRY http://npm.taobao.org

COPY package.json /www/
RUN npm install --no-optional

COPY . /www

RUN npm run build

EXPOSE 9000
CMD ["npm","run", "start:prod"]
