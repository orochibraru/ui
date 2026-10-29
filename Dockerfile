FROM oven/bun:1.4.4-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

FROM deps AS builder
COPY . .
RUN bun run build:docs

FROM alpine:3.24
RUN apk add --no-cache ca-certificates libgcc libstdc++
WORKDIR /app
COPY --from=builder --chown=1000:1000 /app/build ./build
USER 1000:1000
ENV PORT=3000 \
    PROTOCOL_HEADER=x-forwarded-proto \
    HOST_HEADER=x-forwarded-host
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD ["wget", "-q", "--spider", "http://127.0.0.1:3000/llms.txt"]
CMD ["/app/build/server"]
