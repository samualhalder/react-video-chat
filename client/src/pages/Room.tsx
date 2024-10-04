import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../Context/SocketContext";

export default function Room() {
  const { roomId } = useParams();
  const { socket } = useSocket();
  const handleJoinedRoom = useCallback((data) => {
    console.log("hit", data);
  }, []);
  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);
    return () => {
      socket.off("joined-room", handleJoinedRoom);
    };
  }, [socket, handleJoinedRoom]);
  return <>room Id is :{roomId}</>;
}
