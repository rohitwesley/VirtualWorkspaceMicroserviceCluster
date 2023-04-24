# Virtual Workspace MicroService-template

A virtual workspace microservice agent with:

Web API Routs
- Wikipidia API
- Youtube API
- OBS/Desktop API
- Spotify API

Redis Routs
- Comic Lib API
- Movie Lib API
- Image Lib API
- Prop Lib API

Live Streams
- DeepCanvas Network Stream
- Scene Mesh Cluster Stream
- Scene View Composit Stream
- Scene Interface Stream

Full Stack Features :
- express route handling
- get/post REST api routes
- WebSocket api routes
- http admin UI routes
- JWT auth
- docker support

### Based on the templet & medium article

See: [A Nodejs Microservice Template](https://medium.com/@andrew.rapo/a-nodejs-microservice-36f080fe1418)

### If using secure SSL setup for HTTPS server

To configure SSL for your Node.js server, you'll need to do the following steps:

Generate a private key and a certificate signing request (CSR):

vbnet
```
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
```
This will generate a 2048-bit RSA key and a CSR, which you'll need to submit to a certificate authority (CA) to obtain a valid SSL certificate.

Submit the CSR to a CA of your choice and follow their instructions to obtain a signed SSL certificate. Some popular CAs include Let's Encrypt, Comodo, and DigiCert.

Once you have obtained the SSL certificate, combine it with the private key to create a PEM file:

bash:
```cat server.crt server.key > server.pem```
In your Node.js script, create a HTTPS server using the https module and pass in the PEM file:

javascript:
```
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

const server = https.createServer(options, app);
```

This creates a server instance with the specified options, including the SSL certificate and private key.

That's it! Your Node.js server should now be configured to use SSL. When a client connects to your server using HTTPS, their browser will validate the SSL certificate and establish a secure connection.

### customization example

For an example customization of this template, see:
- [Using Unity as Base](https://github.com/wesley/virtualworkspace-microservice)
- https://github.com/wesley/virtualworkspace-microservice.git

### update
```
npm init -y

npm install axios compression cookie-parser cors dotenv debug express express-async-handler handlebars handlebars-loader helmet http-status-codes ip jsonwebtoken morgan multer npm-watch peer pino-pretty redis socket.io uuid ws --save

npm install -D @jest-mock/express @types/express @types/cors @types/handlebars @types/jest @types/node @types/pino @types/redis @types/uuid @types/ws @types/socket.io @types/morgan @types/multer @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-jest jest jest-junit jest-websocket-mock nodemon ts-jest ts-loader ts-node tsconfig-paths-webpack-plugin typescript webpack webpack-cli webpack-node-externals --save
```
#### custom databases: 
```
// UDP
npm install dgram --save
// SQLLite
npm install sqlite3 body-parser --save
// MongoDB
npm install mongoose mongoose-paginate-v2 --save
npm install morgan --save
<!-- npm install multer-gridfs-storage --save
npm install mongodb --save -->
```

### install

`npm install`

### reset
```
 Remove-Item -Recurse -Force node_modules
```

```
Remove-Item package-lock.json
```
### build

`npm run build`

### run

`npm run start`


### docker

#### On Windows direct docker desktop data linux shell to DDocker
1. Check if docker-desktop & docker-desktop-dat shells installed else install docker desktop from site

`wsl -l -v`
```
  NAME                   STATE           VERSION
* Ubuntu                 Running         2
  docker-desktop         Running         2
  docker-desktop-data    Running         2
```
2. Shutdown linux shells

`wsl --shutdown`
3. check if shells stopped

`wsl -l -v`
```
  NAME                   STATE           VERSION
* Ubuntu                 Stopped         2
  docker-desktop         Stopped         2
  docker-desktop-data    Stopped         2
```
4. Backup and unregister default docker-desktop-dat
```
wsl --export docker-desktop-data E:\VirtualWorkspace\VirtualWorkspaceNetwork\VirtualWorkspaceMicroService\DRedis\RedisBackup_001.tar

wsl --unregister docker-desktop-data
Unregistering...

npm install redis --save

```
5. Set docker-desktop-data to DBDocker

`wsl --import docker-desktop-data E:\VirtualWorkspace\VirtualWorkspaceNetwork\DBDocker E:\VirtualWorkspace\VirtualWorkspaceNetwork\VirtualWorkspaceDocker\DockerBackup_001.tar`

6. Check if docker-dektop-data is running 

`wsl -l -v`
```
  NAME                   STATE           VERSION
* Ubuntu                 Running         2
  docker-desktop         Running         2
  docker-desktop-data    Running         2
```
7. Run redis database

- if testing :
```
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```
- if persistent data :
```
docker run -v E:\VirtualWorkspace\VirtualWorkspaceNetwork\VirtualWorkspaceMicroService\DBRedis\:\data -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
 `fe4baa6ead6c0e3368c9e88e1bec8138bc3a491bafaab0e1d04ce4e539afc56c'
 docker ps -a
```
- If restarting Redis:
```
docker restart redis-stack
docker ps -a
```
- If stop Redis:
```
docker stop redis-stack
```
8. Build Virtual Workspace Microserver

`docker build -t virtualworkspace-microservice .` or `npm run docker:build`

9. Set Virtual Workspace Microserver Env variables
Copy `.env-example` to `.env`
```
SERVER_PORT=8008
USE_AUTH=true
```
10. Run Virtual Workspace Microserver

`docker run -it --rm -p 8008:8008 --env-file ./.env virtualworkspace-microservice` or `npm run docker:run`


- Check running container

```
docker ps -a
```

- Shutdown docker

```
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

- Kill
```
docker kill CONTAINER [CONTAINER...]
```

### curl

Prerequestes:

```
npm i node-libcurl --save
```

Without auth:

```sh
curl --location --request POST 'http://localhost:8008/post' \
     --header 'Content-Type: application/json' \
     --data-raw '{
       "utterance": "hello"
     }'
```

With auth

```sh
curl --location --request POST 'http://localhost:8008/post' \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyMSIsImF1dGgiOnsicGVybWlzc2lvbnMiOlt7InNjb3BlcyI6WyJyZWFkIl0sInJlc291cmNlIjoiZXhhbXBsZSJ9XX0sImlhdCI6MTY1MzM2MTQ3OX0.WMbG7o7CaKOf6H7djUpZ7aylvUeYw3N8cdn1K1FrN8A' \
     --data-raw '{
       "utterance": "hello"
     }'
```

```json
{"status":"OK","utterance":"hello","accountId":"user1"}
```



```sh
curl --location --request POST 'http://localhost:8008/auth' \
     --header 'Content-Type: application/json' \
     --data-raw '{
       "accountId": "user1",
       "password": "12345!"
     }'
```

```json
{"message":"Logged in successfully.","access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyMSIsImF1dGgiOnsicGVybWlzc2lvbnMiOlt7InNjb3BlcyI6WyJyZWFkIl0sInJlc291cmNlIjoiZXhhbXBsZSJ9XX0sImlhdCI6MTY1NDM2NzQ5NSwiZXhwIjoxNjU0MzY3NTU1fQ.J7yxsSoOYTvNQtMkLrmlY_TEZT6x4jEvYvnI_Gqr64Q","refresh_toke":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyMSIsImlhdCI6MTY1NDM2NzQ5NSwiZXhwIjoxNjU0NDUzODk1fQ.Lj7fairF_ABjeXzIc_-38aMqfj3ce08fd33V3ymoa04","user_id":"user1"}
```

### http - dashboard

> [Link to Dashboard](http://localhost:8008/)


### socket client

```
cd tools
node socket-cli.js
```

Note; The socket client will authenticate using the credentials in the `tools/.env` file.

This will start a REPL that will accept and echo prompts.

```
client connected
ctrl-c to quit
> hello
hello
```

Anything typed at the `>` prompt will be echoed.
