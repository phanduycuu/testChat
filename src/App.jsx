import React, { useState } from "react";
import Chat from "./chat";
import Login from "./Login";
import ChatRoom from "./chat-v1-copy";
import UploadFile from "./file";
import EmailForm from "./SendEmail";
import MusicPlayer from "./Song";

// function App() {
//   const [room, setRoom] = useState("");
//   const [user, setUser] = useState("");
//   // const [joined, setJoined] = useState(false);

//   // const [token, setToken] = useState({});
//   // const [isLoading, setIsloading] = useState(false);
//   const isJoined = user && room;

//   if (!isJoined) {
//     return (
//       <div style={{ padding: "20px" }}>
//         <h2>Join a Chat Room</h2>
//         <input
//           type="text"
//           placeholder="Enter your name"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="Enter room name"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//       </div>
//     );
//   }
//   return (
//     <>
//       {/* <div>
//         <Login
//           setUser={setUser}
//           setToken={setToken}
//           setIsloading={setIsloading}
//         />
//         {isLoading && <Chat user={user} token={token} />}
//       </div> */}
//       {/* <div>
//         <Login
//           setUser={setUser}
//           setToken={setToken}
//           setIsloading={setIsloading}
//         />
//         {isLoading && <ChatRoom roomName={8} user={user.employee} />}
//       </div> */}
//       {/* <UploadFile /> */}
//       {/* <EmailForm /> */}
//       {/* <MusicPlayer /> */}
//       <ChatRoom roomName={room} user={user} />
//     </>
//   );
// }
function App() {
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState("");
  const styles = {
    container: {
      minHeight: "100vh", // Chiều cao tối thiểu là 100% chiều cao màn hình
      width: "100vw", // Chiều rộng là 100% chiều rộng màn hình
      display: "flex", // Dùng Flexbox
      justifyContent: "center", // Canh giữa theo chiều ngang
      alignItems: "center", // Canh giữa theo chiều dọc
      background: "#f0f2f5", // Màu nền sáng
    },
    card: {
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      width: "300px",
      textAlign: "center",
    },
    title: {
      marginBottom: "20px",
      fontSize: "22px",
      color: "#333",
    },
    input: {
      width: "93%",
      padding: "10px",
      margin: "8px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#4CAF50",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    error: {
      color: "red",
      fontSize: "14px",
      marginTop: "4px",
    },
  };
  const handleJoin = () => {
    if (user.trim() && room.trim()) {
      setHasJoined(true);
      setError("");
    } else {
      setError("Vui lòng nhập đầy đủ tên và tên phòng.");
    }
  };

  if (hasJoined) {
    return <ChatRoom roomName={room} user={user} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Tham gia phòng chat</h2>
        <input
          type="text"
          placeholder="Tên của bạn"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Tên phòng"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button onClick={handleJoin} style={styles.button}>
          Tham gia
        </button>
      </div>
    </div>
  );
}

export default App;
