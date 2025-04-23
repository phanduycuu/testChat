import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmailForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/email/send/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Test Email",
        message: message,
        recipient: "0cauchin0@gmail.com",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h2>Soạn Email</h2>
      <ReactQuill value={message} onChange={setMessage} />
      <button onClick={handleSubmit}>Gửi Email</button>
    </div>
  );
};

export default EmailForm;
