import { useState, useEffect } from "react";
import axios from "axios";
import UploadFile from "./file";

const ChatRoom = ({ roomName = 1, user }) => {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
    setSocket(ws);

    // Gọi API lấy lịch sử tin nhắn
    axios
      .get(`http://127.0.0.1:8000/chat-history/${roomName}/`)
      .then((response) => setChats(response.data))
      .catch((error) => console.error("Error fetching chat history:", error));

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChats((prev) => [
        ...prev,
        { sender: data.sender, chat: data.message },
      ]); // Đổi "chat" thành "message"
    };

    ws.onopen = () => console.log("WebSocket connected");
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      ws.close(); // Cleanup WebSocket khi component unmount
    };
  }, [roomName]);

  const sendChat = () => {
    if (socket && chat) {
      socket.send(JSON.stringify({ message: chat, sender: user.id })); // Đảm bảo gửi đúng key "message"
      setChat("");
    }
  };

  return (
    <div>
      <h2>Chat Room: {roomName}</h2>
      <div
        style={{
          border: "1px solid #111010",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {chats.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: "5px",
              background: msg.sender === user.email ? "#67db0f" : "#232570",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.chat}
            {/* {console.log(msg)} */}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />

      <button onClick={sendChat}>Gửi</button>
    </div>
  );
};

export default ChatRoom;
