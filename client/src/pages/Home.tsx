import { Button, Label, TextInput } from "flowbite-react";
import { useSocket } from "../Context/SocketContext";

export default function Home() {
  const { socket } = useSocket();
  const data = {
    roomId: "1",
    email: "samual@gmail",
  };
  socket.emit("join-room", { data });
  return (
    <div className="h-screen w-full">
      <form className="flex flex-col h-full gap-4 justify-center items-center">
        <div className="w-[400px]">
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="w-[400px]">
          <div className="mb-2 block">
            <Label htmlFor="code" value="Your room code" />
          </div>
          <TextInput id="code" type="text" required />
        </div>
        <Button type="submit" className="w-[400px]">
          Submit
        </Button>
      </form>
    </div>
  );
}
