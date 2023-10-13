FROM node:16.20.0-alpine3.18 as base

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
    && apk update && apk add --no-cache tzdata curl jq git \
    && corepack enable \
    && corepack prepare pnpm@8.4.0 --activate \
    && pnpm config set registry https://registry.npm.taobao.org \
    && pnpm config set store-dir .pnpm-store \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/*


FROM base as builder

WORKDIR /app

COPY internal ./internal
COPY packages ./packages
COPY apps ./apps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

RUN pnpm install

COPY . .

RUN pnpm build


FROM nginx:alpine

WORKDIR /app/frontend

COPY --from=builder /app/deployment /etc/nginx/conf.d
COPY --from=builder --chown=nginx:nginx --chmod=755 /app/dist /app/frontend

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
    && apk update && apk add --no-cache tzdata \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* \
    && mkdir -p -m 644 /app/backend/public \
    && chown -R nginx:nginx /app/backend
