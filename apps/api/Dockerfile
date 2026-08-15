FROM node:24-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && corepack enable

WORKDIR /workspace


FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

COPY apps/api/package.json apps/api/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/queue/package.json packages/queue/package.json

RUN pnpm install --filter @coursepilot/api... --frozen-lockfile


FROM dependencies AS builder

COPY tsconfig.base.json ./

COPY apps/api apps/api
COPY packages/database packages/database
COPY packages/queue packages/queue

RUN pnpm --filter @coursepilot/queue build
RUN pnpm --filter @coursepilot/database build
RUN pnpm --filter @coursepilot/api build


FROM base AS runtime

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

COPY apps/api/package.json apps/api/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/queue/package.json packages/queue/package.json

RUN pnpm install \
  --filter @coursepilot/api... \
  --prod \
  --frozen-lockfile

COPY --from=builder /workspace/apps/api/dist apps/api/dist

COPY --from=builder /workspace/packages/database/dist packages/database/dist

COPY --from=builder \
  /workspace/packages/database/src/generated/prisma \
  packages/database/src/generated/prisma

COPY --from=builder /workspace/packages/queue/dist packages/queue/dist

USER node

EXPOSE 4000

CMD ["node", "apps/api/dist/server.js"]