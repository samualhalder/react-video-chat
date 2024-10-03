import { Button, Label, TextInput } from "flowbite-react";
import { useSocket } from "../Context/SocketContext";
import { useState } from "react";

export default function Home() {
  const { socket } = useSocket();
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join-room", { roomId, email });
  };
  return (
    <div className="h-screen w-full">
      <form
        className="flex flex-col h-full gap-4 justify-center items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-[400px]">
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-[400px]">
          <div className="mb-2 block">
            <Label htmlFor="code" value="Your room code" />
          </div>
          <TextInput
            id="code"
            type="text"
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-[400px]">
          Submit
        </Button>
      </form>
    </div>
  );
}
