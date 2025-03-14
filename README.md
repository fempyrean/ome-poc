# OvenMediaEngine POC

## Description
This POC creates a simple page that can be used to start a stream to an OvenMediaEngine server running locally.

### Docker image
We can use the docker image provided by AirenSoft: `airensoft/ovenmediaengine:latest`

There is a custom Dockerfile in this repository but it makes no relevant changes to the image, it just adds vim so we can edit files inside the container.

### Server.xml
This is the most important file. I made a few changes to the file to:

- Enable and configure stream recording
- Enable the [API](https://airensoft.gitbook.io/ovenmediaengine/rest-api) so we can use Postman to start and stop recordings

The API can also:
- List active streams
- List active recordings
- Start a recording
- Stop a recording
- List virtual hosts
- List applications

### Client
A simple web page that can be used to start streaming to the OvenMediaEngine

## Running the OvenMediaPlayer
You can follow [this link](https://airensoft.gitbook.io/ovenmediaengine/quick-start#run-ovenplayer-demo) to run the OvenMediaPlayer. The player can be used to connect to your stream and validate that it is working.

## Running the OvenMediaEngine

### Port Forwarding
When creating the container, aside from the ports forwarded in the [OME's documentation](https://airensoft.gitbook.io/ovenmediaengine/quick-start#run-ovenmediaengine), make sure to also forward requests to port `8081` to your container, this is the port where the REST API is available.


## Steps to run the POC

### Run the OvenMediaEngine server
- Follow OME's documentation instructions, making sure to forward requests made to port `8081`.
- Run the OvenMediaPlayer
- Run the client and open it in your browser
- Start sharing from the client
- Check that you can watch your stream in the OvenMediaPlayer

### Recording your stream
You can follow the [Rest API documentation page](https://airensoft.gitbook.io/ovenmediaengine/rest-api) to figure out how to start and stop a recording, but here's a summary:

### Authentication
The Rest API uses basic authentication. If you haven´t changed the Server.xml file to use a different password, then your authentication token should be `b21lLWFjY2Vzcy10b2tlbg=`.

Therefore, to make authenticated requests, you just need to include an `Authorization` header with the `Basic b21lLWFjY2Vzcy10b2tlbg==` value to your request.

### Start recording a stream

`POST http://localhost:8081/v1/vhosts/default/apps/app:startRecord`

```
{
    "id": "stream_id",
    "stream": {
        "name": "stream"
    }
}
```

### Stop recording a stream

`POST http://localhost:8081/v1/vhosts/default/apps/app:stopRecord`
```
{
    "id": "stream_id"
}
```