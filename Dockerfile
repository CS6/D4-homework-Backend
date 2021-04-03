
FROM node:15.12.0-alpine3.10
# ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*"]
# RUN npm install --silent && mv node_modules ../
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
