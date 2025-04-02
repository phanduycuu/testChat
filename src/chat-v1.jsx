import { useState, useEffect } from "react";
import axios from "axios";

const ChatRoom = ({ roomName = 1, user }) => {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
    setSocket(ws);

    axios
      .get(`http://127.0.0.1:8000/chat-history/${roomName}/`)
      .then((response) => setChats(response.data))
      .catch((error) => console.error("Error fetching chat history:", error));

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChats((prev) => [
        ...prev,
        { sender: data.sender, chat: data.message, file: data.file },
      ]);
    };

    return () => {
      ws.close();
    };
  }, [roomName]);

  const sendChat = () => {
    if (!socket) return;

    const messageData = { message: chat, sender: user.id, file: null };

    if (file) {
      const formData = new FormData();
      formData.append("link", file);
      formData.append("name", "test send");

      axios
        .post("http://127.0.0.1:8000/api/files/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          messageData.file = response.data.id;
          console.log(response.data.id);
          socket.send(JSON.stringify(messageData));
        })
        .catch((error) => console.error("File upload error:", error));
    } else {
      socket.send(JSON.stringify(messageData));
    }

    setChat("");
    setFile(null);
  };

  return (
    <div>
      <h2>Chat Room: {roomName}</h2>
      <div
        style={{
          border: "1px solid #111",
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
            {console.log(msg)}
            <strong>{msg.sender}:</strong> {msg.chat}
            {msg.file && (
              <div>
                <a
                  href={`http://127.0.0.1:8000${msg.file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📁{msg.file.name}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={sendChat}>Gửi</button>
    </div>
  );
};

export default ChatRoom;
