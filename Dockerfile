FROM node:22-bookworm-slim AS base
WORKDIR /app

FROM base AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch
COPY package.json ./
COPY client/package.json client/
COPY server/package.json server/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --offline --frozen-lockfile
COPY . ./
RUN pnpm build
RUN pnpm --filter todo-server deploy -P deployment
RUN cp -r client/build/client deployment/public
RUN cp LICENSE.txt deployment

FROM base
COPY --from=build /app/deployment .
ENV NODE_ENV=production
EXPOSE 8080
CMD [ "node", "dist/main" ]
