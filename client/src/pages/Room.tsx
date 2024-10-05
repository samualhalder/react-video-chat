import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../Context/SocketContext";
import { Button } from "flowbite-react";
import ReactPlayer from "react-player";

export default function Room() {
  const { roomId } = useParams();
  const { socket } = useSocket();
  const [remoteSockerId, setRemoteSockerId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const handleJoinedRoom = useCallback((data) => {
    setRemoteSockerId(data.socketId);
    console.log("hit", data);
  }, []);

  const handleUserCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);
  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);
    return () => {
      socket.off("joined-room", handleJoinedRoom);
    };
  }, [socket, handleJoinedRoom]);
  return (
    <>
      <div className="h-screen flex flex-col items-center gap-4">
        <h1 className="text-5xl">Room</h1>
        <h2 className="text-3xl">room Id :{roomId}</h2>
        <p>{remoteSockerId === null ? "no one in the room" : "connected"}</p>
        {remoteSockerId && <Button onClick={handleUserCall}>Call</Button>}
        {myStream && (
          <div>
            <h2>My-Cam</h2>
            <ReactPlayer
              playing
              muted
              width="200px"
              height="150px"
              url={myStream}
            />
          </div>
        )}
      </div>
    </>
  );
}
