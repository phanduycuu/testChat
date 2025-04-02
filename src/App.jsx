import React, { useState } from "react";
import Chat from "./chat";
import Login from "./Login";
import ChatRoom from "./chat-v1";
import UploadFile from "./file";

function App() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});
  const [isLoading, setIsloading] = useState(false);

  return (
    <>
      {/* <div>
        <Login
          setUser={setUser}
          setToken={setToken}
          setIsloading={setIsloading}
        />
        {isLoading && <Chat user={user} token={token} />}
      </div> */}
      <div>
        <Login
          setUser={setUser}
          setToken={setToken}
          setIsloading={setIsloading}
        />
        {isLoading && <ChatRoom roomName={8} user={user.employee} />}
      </div>
      {/* <UploadFile /> */}
    </>
  );
}

export default App;
