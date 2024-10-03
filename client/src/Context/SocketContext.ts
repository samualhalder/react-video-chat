import { createContext, useContext } from "react";

// Create the context
export const SocketContext = createContext<null | unknown | any>(null);
export const useSocket = () => {
  return useContext(SocketContext);
};
