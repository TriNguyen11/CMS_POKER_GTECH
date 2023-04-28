FROM node:alpine
WORKDIR /usr/src/app/admin
COPY ./package*.json .
RUN yarn
COPY . .
RUN yarn build

# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
CMD [ "npx", "serve", "-s", "build" ]

# CMD [ "yarn", "start" ]

# # development
# FROM node:alpine as development
# WORKDIR /usr/src/app/admin
# COPY ./news-admin/package*.json .
# RUN yarn
# COPY ./news-admin .
# RUN yarn build

# # production
# FROM node:alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app/admin

# RUN yarn --only=production

# COPY --from=development /urs/src/app/dist ./dist

# CMD ["node", "dist/apps/orders/main"]