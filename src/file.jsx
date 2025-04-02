import { useState, useEffect } from "react";
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Lấy danh sách file từ server
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/files/") // Đổi URL nếu cần
      .then((response) => setFiles(response.data))
      .catch((error) => console.error("Lỗi khi lấy danh sách file:", error));
  }, []);

  // Xử lý chọn file
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Gửi file lên server
  const handleUpload = async () => {
    if (!file) {
      alert("Vui lòng chọn file trước khi tải lên!");
      return;
    }

    const formData = new FormData();
    formData.append("link", file); // "link" là tên field trong Django model
    formData.append("name", "file");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/files/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("File đã được tải lên!");
      setFiles([...files, response.data]); // Cập nhật danh sách file
      setFile(null); // Reset input file
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
      alert("Tải lên thất bại!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">📤 Upload File</h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 w-full rounded-md"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600"
      >
        Upload
      </button>

      <h3 className="text-lg font-semibold mt-4">📂 Danh sách file:</h3>
      <ul className="list-disc pl-5">
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.link} target="_blank" rel="noopener noreferrer">
              {file.link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadFile;
