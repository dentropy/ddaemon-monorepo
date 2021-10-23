FROM node:16-alpine
COPY backend /home/node/app/backend
RUN ls /home/node/app
RUN cd /home/node/app/backend && npm install
# COPY react /home/node/app/react
# RUN cd /home/node/app/react && npm install
# RUN cd /home/node/app/react && npm run build
# RUN mv /home/node/app/react/build /home/node/app/backend/static
EXPOSE 8081
WORKDIR /home/node/app/backend
CMD [ "node", "./index.js" ]