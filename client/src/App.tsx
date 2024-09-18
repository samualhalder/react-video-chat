import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { SocketContext } from "./Context/SocketContext";
import { io } from "socket.io-client";
import { useMemo } from "react";
function App() {
  const socket = useMemo(() => io("http://localhost:8081"), []);
  return (
    <>
      <BrowserRouter>
        <SocketContext.Provider value={{ socket }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </SocketContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
