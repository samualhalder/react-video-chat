import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../Context/SocketContext";
import peer from "../services/peer";
import { Button } from "flowbite-react";
import ReactPlayer from "react-player";

export default function Room() {
  const { roomId } = useParams();
  const { socket } = useSocket();
  const [remoteSockerId, setRemoteSockerId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const handleJoinedRoom = useCallback(
    ({ email, socketId }: { email: string; socketId: string }) => {
      setRemoteSockerId(socketId);

      console.log("remote socket id", email, remoteSockerId, socketId);

      console.log("hit");
    },
    [remoteSockerId]
  );

  const handleUserCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    console.log("call to", remoteSockerId);

    socket.emit("user-call", { to: remoteSockerId, offer });

    setMyStream(stream);
  }, [remoteSockerId, socket]);
  const handleIncomingCall = useCallback(
    ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCLocalSessionDescriptionInit;
    }) => {
      console.log("hit");

      console.log("incoming call from", from, offer);
    },
    []
  );

  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);
    socket.on("incoming-call", handleIncomingCall);
    return () => {
      socket.off("joined-room", handleJoinedRoom);
      socket.off("incoming-call", handleIncomingCall);
    };
  }, [socket, handleJoinedRoom, handleIncomingCall]);

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
