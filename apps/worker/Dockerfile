FROM node:24-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /workspace


FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/worker/package.json apps/worker/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/queue/package.json packages/queue/package.json

RUN pnpm install --filter @coursepilot/worker... --frozen-lockfile


FROM dependencies AS builder

COPY tsconfig.base.json ./
COPY apps/worker apps/worker
COPY packages/config packages/config
COPY packages/queue packages/queue

RUN pnpm --filter @coursepilot/config build
RUN pnpm --filter @coursepilot/queue build
RUN pnpm --filter @coursepilot/worker build


FROM base AS runtime

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/worker/package.json apps/worker/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/queue/package.json packages/queue/package.json

RUN pnpm install --filter @coursepilot/worker... --prod --frozen-lockfile

COPY --from=builder /workspace/apps/worker/dist apps/worker/dist
COPY --from=builder /workspace/packages/config/dist packages/config/dist
COPY --from=builder /workspace/packages/queue/dist packages/queue/dist

USER node

CMD ["node", "apps/worker/dist/worker.js"]