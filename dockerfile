FROM node:10-alpine
WORKDIR /home/node/app
ADD backend /home/node/app
RUN cd /home/node/app/backend && npm install
ADD react /home/node/app
RUN cd /home/node/app/react && npm install
RUN cd /home/node/app/react && npm run build
RUN mv /home/node/app/react/build /home/node/app/backend/static
EXPOSE 8080
CMD [ "node", "./backend/index.js" ]