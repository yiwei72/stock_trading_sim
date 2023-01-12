# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:lts AS development

RUN mkdir -p /code
COPY ./package.json /code
COPY ./package-lock.json /code

WORKDIR /code
RUN npm ci
COPY . /code

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]

FROM development AS dev-envs
RUN <<EOF \
apt-get update \ 
apt-get install -y git \
EOF

RUN <<EOF \
useradd -s /bin/bash -m vscode \
groupadd docker \
usermod -aG docker vscode \
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

FROM development AS build

RUN ["npm", "run", "build"]

FROM nginx:1.13-alpine

COPY --from=build /code/build /usr/share/nginx/html