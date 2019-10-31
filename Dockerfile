FROM node:10

WORKDIR /user/app
COPY . .

RUN yarn install

EXPOSE 4500
EXPOSE 4600


CMD ["yarn", "start"]