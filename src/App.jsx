import React, { useState } from "react";
import Chat from "./chat";
import Login from "./Login";
import ChatRoom from "./chat-v1-copy";
import UploadFile from "./file";
import EmailForm from "./SendEmail";
import MusicPlayer from "./Song";

function App() {
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  // const [joined, setJoined] = useState(false);

  // const [token, setToken] = useState({});
  // const [isLoading, setIsloading] = useState(false);
  if (!user || !room) {
    return (
      <>
        <input
          type="text"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
      </>
    );
  }
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
      {/* <div>
        <Login
          setUser={setUser}
          setToken={setToken}
          setIsloading={setIsloading}
        />
        {isLoading && <ChatRoom roomName={8} user={user.employee} />}
      </div> */}
      {/* <UploadFile /> */}
      {/* <EmailForm /> */}
      {/* <MusicPlayer /> */}
      <ChatRoom roomName={room} user={user} />
    </>
  );
}

export default App;
