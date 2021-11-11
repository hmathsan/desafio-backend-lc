FROM node:16.13.0-alpine

WORKDIR /src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install --silent

# add app
COPY . ./

# start app
CMD ["yarn", "start"]