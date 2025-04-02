import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatRoom from "./chat-v1";

const Chat = ({ user, token }) => {
  const [friends, setFriends] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/account/pending_requests/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPendingRequests(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Lỗi tải danh sách lời mời:", err));
  }, []);

  const respondToRequest = (id, action) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/account/${id}/respond_friend_request/`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setPendingRequests(
          pendingRequests.filter((req) => req.user1.id !== id)
        );
      })
      .catch((err) => console.error("Lỗi xử lý lời mời:", err));
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/account/friends/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setFriends(res.data))
      .catch((err) => console.error("Lỗi tải danh sách bạn bè:", err));
  }, []);

  return (
    <div>
      <h2>Lời mời kết bạn</h2>
      <ul>
        {pendingRequests.map((req) => (
          <li key={req.user1}>
            {req.user1}
            <button onClick={() => respondToRequest(req.user1, "accept")}>
              Chấp nhận
            </button>
            <button onClick={() => respondToRequest(req.user1, "decline")}>
              Từ chối
            </button>
          </li>
        ))}
      </ul>

      {!joined ? (
        <div>
          <h2>Chọn bạn để nhắn tin</h2>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id}>
                {friend.full_name} ({friend.email})
                <button
                  onClick={() => {
                    setRoomName(
                      `${Math.min(user.id, friend.id)}_${Math.max(
                        user.id,
                        friend.id
                      )}`
                    );
                    setJoined(true);
                  }}
                >
                  Nhắn tin
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ChatRoom roomName={roomName} user={user} />
      )}
    </div>
  );
};

export default Chat;
