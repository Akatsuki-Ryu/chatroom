#for debugbuild , the dockercompose will load dockerfile.debug
#for debug
# Stage 1
FROM node:10 as react-build-client
WORKDIR /app
COPY . ./
#RUN yarn
#RUN yarn build
EXPOSE 3000
CMD ["npm","start"]

#
## Stage 2 - the production environment with nginx
#FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=react-build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

#################################################################################
#for prod build , the dockercompose will load dockerfile.prod
# Stage 1
FROM node:10 as react-build-client
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
EXPOSE 3000
CMD ["npm","start"]


# Stage 2 - the production environment with nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build-client /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
