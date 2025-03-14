import { useRef } from "react";
import OvenLiveKit from "ovenlivekit";
import "./App.css";

const config = {
  callbacks: {
    error: function (error) {
      console.log("ERROR:", error);
    },
  },
};

function App() {
  const OLK = new OvenLiveKit.create(config);
  const playerRef = useRef<HTMLVideoElement>(null);

  //   const handleScreenShare = async () => {
  //     console.log(OvenLiveKit);
  //     const mediaStream = await navigator.mediaDevices.getDisplayMedia({
  //       video: {
  //         displaySurface: "monitor",
  //       },
  //     });
  //     playerRef.current!.srcObject = mediaStream;
  //   };

  const handleScreenShare = async () => {
    await OLK.getDisplayMedia({
      video: {
        displaySurface: "monitor",
      },
    });

    try {
      const http = "http://localhost:3333/app/stream?direction=whip";
      //   const ws = "ws://localhost:3333/app/stream";
      const response = OLK.startStreaming(http);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <p style={{ cursor: "pointer" }} onClick={handleScreenShare}>
        Share screen
      </p>

      <video
        ref={playerRef}
        id="player"
        autoPlay
        playsInline
        controls={false}
      />
    </>
  );
}

export default App;
