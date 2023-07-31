import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import classnames from "classnames";
import { updateText, updateProgress } from "./store/actions";

import Abstract from "./components/abstract";
import Progress from "./components/progress";
import GraphComponent from "./components/graph";

function App() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  const job_status = useSelector((state) => state.job_status);

  useEffect(() => {
    const socketIOClient = io("http://localhost:5000");

    socketIOClient.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server");
    });

    socketIOClient.on("extract-relation_job_status", (server_message) => {
      console.log("Received from server: ", server_message);
      dispatch(updateProgress(server_message));
    });

    socketIOClient.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    setSocket(socketIOClient);

    return () => {
      socketIOClient.disconnect();
    };
  }, []);

  const connectionStatusClasses = classnames(
    "absolute top-0 right-0 m-4 p-2 text-xs font-bold text-white uppercase rounded-full",
    {
      "bg-green-500": isConnected,
      "bg-red-500": !isConnected,
    }
  );

  return (
    <div class="bg-animation flex items-center justify-center h-screen">
      <div class="glass max-w-lg w-full space-y-8 ">
        <div className={connectionStatusClasses}>
          {isConnected ? "Connected" : "Not Connected"}
        </div>

        {job_status == "WAITING_FOR_ABSTRACT" ? (
          <div className="p-10">
            <Abstract socket={socket} />
          </div>
        ) : null}
        {job_status == "COMPLETED" ? (
          <div className="pb-2">
            <GraphComponent />
          </div>
        ) : null}

        {job_status == "IN_QUEUE" ? (
          <div className="p-10">
            <Progress message="Your job is placed in Queue"/>
          </div>
        ) : null}

        {job_status == "PROGRESSING" ? (
          <div className="p-10">
            <Progress message="Extracting Relations From Text" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
