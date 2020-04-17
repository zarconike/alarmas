FROM node:latest as builder

COPY package*.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
#RUN npm i --save-dev typescript@3.7.5

RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

#RUN npm install -g typescript@3.6.4

RUN npm run build:prod
#RUN node --max_old_space_size=4098 node_modules/@angular/cli/bin/ng build --prod

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:1.15.0-alpine

COPY ./deploy/default.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/alarms-management-ui /usr/share/nginx/html


# Copy the EntryPoint
COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh
ENTRYPOINT ["/entryPoint.sh"]

CMD ["nginx", "-g", "daemon off;"]

