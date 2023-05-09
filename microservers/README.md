
# Virtual Workspace Studio Microservice Network

This project demonstrates a Virtual Studio Network using FFmpeg, Node.js, Redis, Docker, and Unity. The system allows processing live and offline video streams from multiple clients.

## Prerequisites

- [Docker](https://www.docker.com/) (v20.10.0 or later)
- [Git](https://git-scm.com/) (v2.25.0 or later)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (v14+)
- [Redis Stack](https://redis.io/)
- Unity (optional, for the Unity client)
- FFmpeg

## Project Structure
```
├── .gitignore
├── Doxfile
│
├── Doxygen/
│ ├── index.html
│ └── ...
│
├── HELP_Doc
├── HELP_ProjMang
├── LICENSE
│
├── microservices/
│ ├── .dockerignore
│ ├── .env.example
│ ├── .gitignore
│ ├── microserverLaunch.sh
│ ├── microserverLaunch.ps1
│ ├── envSetup.sh
│ ├── envSetup.ps1
│ ├── dashboard_microserver/
│ │ ├── public/
│ │ │ ├── dashboard/
│ │ │ | ├── css/
│ │ │ | | ├── style.css
| │ │ │ | └── ...
│ │ │ | ├── js/
│ │ │ | | ├── card.js
│ │ │ | | ├── client.ts
│ │ │ | | ├── signup-loader.ts
│ │ │ | | ├── signup.ts
| │ │ │ | └── ...
| │ │ │ └── ...
│ │ │ ├── webbrowser/
│ │ │ | ├── js/
│ │ │ | | ├── webbrowserapp.ts
| │ │ │ | └── ...
│ │ │ | ├── webbrowser.html
| │ │ │ └── ...
| │ │ ├── index.html
| │ │ └── ...
| │ └── ...
│ │ ├── src/
│ │ │ ├── auth/
| │ │ │ ├── ExpressAuthFunctions.ts
| │ │ │ ├── index.ts
| │ │ │ ├── JWAuth.ts
| │ │ │ └── ...
│ │ │ ├── config/
| │ │ │ ├── dbConfig.ts
| │ │ │ └── ...
│ │ │ ├── errors/
| │ │ │ ├── index.ts
| │ │ │ └── ...
│ │ │ ├── handlers/
| │ │ │ ├── index.ts
| │ │ │ └── ...
│ │ │ ├── model/
| │ │ │ ├── index.ts
| │ │ │ └── ...
│ │ │ ├── types/
| │ │ │ ├── auth.ts
| │ │ │ ├── index.ts
| │ │ │ └── ...
│ │ │ ├── util/
| │ │ │ ├── ExpressRouterWrapper.ts
| │ │ │ └── ...
│ │ │ ├── index.ts
| │ │ └── ...
| │ └── ...
│ │ ├── test/
│ │ │ ├── cUrl.dashboard.RESTView.test.js
│ │ │ ├── cUrl.RESTEdit.test.js
│ │ │ ├── cUrl.RESTDel.test.js
│ │ │ ├── cUrl.RESTScrollList.test.js
│ │ │ ├── cUrl.RESTPubSubEventSystem.test.js
│ │ │ ├── cUrl.RESTJSONWebImgObject.test.js
| │ │ └── ...
| │ ├── tools/
│ │ ├── .dockerignore
│ │ ├── .env
│ │ ├── .gitignore
│ │ ├── docker-compose.yml
│ │ ├── Dockerfile
│ │ ├── package.json
│ │ ├── README.md
│ │ ├── tsconfig.paths.json
│ │ ├── tsconfig.json
│ │ ├── tsconfig.build.json
│ │ ├── webpack.config.js
| │ └── ...
| └── ...
│
│ ├── redis_microserver/
| │ ├── data/
| │ │ ├── redis/
| │ │ | └── ...
| │ │ ├── redis.conf
| │ │ └── ...
| │ ├── .dockerignore
| │ ├── .env
| │ ├── .gitignore
| │ ├── docker-compose.yml
| │ ├── README.md
| │ └── ...
| └── ...
│
│ ├── python-microserver/
| │ ├── .dockerignore
| │ ├── Dockerfile
| │ ├── README.md
| │ ├── setup.py
| │ ├── app/
│ │ ├ ├── __init__.py
│ │ ├ ├── main.py
│ │ ├ ├── CLIPSApi.py
│ │ ├ ├── MicroserverAPI.py
│ │ ├ ├── MicroserverInterface.py
│ │ ├ ├── models.py
| │ | └── ...
| │ ├── notebooks/
│ │ ├ ├── MicroserverAPI.ipynb
│ │ ├ ├── MicroserverInterface.ipynb
| │ | └── ...
| │ ├── test/
│ │ ├ ├── redis.redisfastifyRESTCLIPBrowser.test.js
│ │ ├ ├── redis.redisfastifyRESTTex2ImagDifusion.test.js
│ │ ├ ├── MicroserverAPI.test.cURL
│ │ ├ ├── MicroserverInterface.test.cURL
| │ | └── ...
| │ └── ...
| └── ...
│
│ ├── unity_client/
| │ ├── VirtualWorkspaceVideoComputeTool/
│ │ | ├── Editor/
│ │ | | ├── VideoStreamingTools
| │ | | └── ...
| │ │ └── ...
│ │ | ├──  Runtime/
│ │ | | ├── VideoStreamingTools
| │ │ | | ├── MonoBehavior/
| │ │ | | | ├── VideoInterfaceManager.cs
| │ │ | | | ├── VideoComputeManager.cs
| │ │ | | | ├── VideoStreamingManager.cs
| │ │ | | | └── ...
| │ │ | | ├── Materials/
| │ │ | | | ├── Shaders/
| │ │ | | | | ├── VideoCompute.compute
| │ │ | | | | ├── VideoView.compute
| │ │ | | | | ├── VideoInteract.compute
| │ │ | | | | └── ...
| │ │ | | | └── ...
| │ │ | | ├── Prefabs/
| │ │ | | | ├── VideoStreamingManager.prefab
| │ │ | | | └── ...
| │ │ | | ├── ScriptableObjects/
| │ │ | | | ├── VideoStreamInfo.cs
| │ │ | | | └── ...
| │ │ | | └── ...
| │ │ | └── ...
| │ | ├── Samples/
│ │ ├ ├ ├── VideoStreamingTools
| │ │ | | ├── Scene/
| │ │ | | | ├── VideoEditor.unity
| │ │ | | | └── ...
| │ │ | | └── ...
| │ │ | └── ...
| │ | └── ...
| │ └── ...
| └── ...
│
│ ├── ffmpeg_microserver/
| │ ├── src/
│ │ ├ ├── controllers/
│ │ ├ ├ ├── videoController.ts
| │ | | └── ...
│ │ ├ ├── ffmpeg/
│ │ ├ ├ ├── ffmpegManager.ts
| │ | | └── ...
│ │ ├ ├── redis/
│ │ ├ ├ ├── redisManager.ts
| │ | | └── ...
│ │ ├ ├── index.ts
| │ | └── ...
| │ ├── test/
│ │ ├ ├── package.json
│ │ ├ ├── videoController.test.ts
│ │ ├ ├── redisClient.test.ts
│ │ ├ ├── redisManager.test.ts
| │ | └── ...
│ │ ├── .dockerignore
│ │ ├── Dockerfile
│ │ ├── package.json
│ │ ├── README.md
│ │ ├── tsconfig.json
| │ └── ...
| └── ...
│
│ ├── DBvideo/
| └── ...
│
│ ├── DBimage/
| └── ...
│
│ ├── DBarchive/
| └── ...
└── ...
│
├── README.md
│
├── research-microservices/
│ ├── research-microservice-1/
│ │ ├── Doxyfile
│ │ ├── LICENSE
│ │ ├── README.md
│ │ └── ...
│ ├── research-microservice-2/
│ │ ├── Doxyfile
│ │ ├── LICENSE
│ │ ├── README.md
│ │ └── ...
└── ...

```


## Setup

1. Clone the project from the GitHub repository and setup environment variables:


    >1. Open a terminal window.
    >2. Clone the project from the GitHub repository:
    >```
    >cd microserver
    >git clone https://github.com/[username]/[repository].git
    >```
    >Replace [username], [repository], [branch], and [path] with the appropriate values for your repository.
    >
    >2. Navigate to the `microserver` directory where you want to customise the `env` the microservice subfolders.
    >3. Copy and paste the following command into the terminal:
    >unix terminla: `sh envSetup.sh` or in a powershell terminal use `./envSetup.sh` or `./envSetup.ps1`

    >Replace [username], [repository], [branch], and [path] with the appropriate values for your repository.
    >
    >4. Press Enter to execute the script.
    >5. Wait for the script to finish creating the necessary files for the microservices.
    >6. You should now have three subfolders with the necessary configuration files for each microservice.

2. Set up the Redis microservice:

```
cd redis
REDIS_PASSWORD=mypassword docker-compose up -d
```

3. Set up the video processing microservice:

```
cd video_processing
docker build -t video-processing .
docker run -d -p 3000:3000 --name video-processing video-processing
```

4. Set up the Node.js server:
```
cd node_server
docker build -t node_server .
docker run -d -p 8080:8080 --name node_server --link redis:redis node_server
```

5. (Optional) Set up the Unity client:
- Open the Unity project located in the `unity_client` folder.
- Add the `VideoStreamingClient` script to a GameObject in your scene.
- Assign the video plane and compute shader to the corresponding fields in the inspector.
- Run the Unity project.

6. Open a web browser and navigate to `http://localhost:8080` to test the video streaming functionality.

    >you can use the shell script to automate launching the microservers using `./microserverLaunch.sh` or `./microserverLaunch.ps1`
## Usage

- Access the REST API for the video processing microservice at `http://localhost:3000`.
- Available REST endpoints:
- POST `/reset`: Resets and installs the latest FFmpeg version in the Docker container.
- POST `/offlinestream`: Processes an offline video stream from a provided URL and broadcasts it over the RTP server.
- POST `/livestream`: Processes a live video stream from a client's webcam and broadcasts it over the RTP server.
- GET `/browse`: Browse the content of the `dVideo` folder and display it as a paged list of cards.
- WebSocket events for live and offline stream processing are published using Redis Pub/Sub and can be handled in the client application.

## Contributors
<!-- Contributions are welcome! Feel free to open an issue or submit a pull request. -->
- Wesley Thomas
- GPT

## License
This project is licensed under the [MIT License.](https://opensource.org/license/mit/)