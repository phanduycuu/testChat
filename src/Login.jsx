import { useState } from "react";
import axios from "axios";

const Login = ({ setUser, setToken, setIsloading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/account/login/",
        {
          email,
          password,
        }
      );

      const { access, refresh, user } = response.data;
      console.log(response.data);
      //   localStorage.setItem("accessToken", access);
      //   localStorage.setItem("refreshToken", refresh);
      //   localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(access);
      setIsloading(true); // Điều hướng sau khi đăng nhập
    } catch (err) {
      setError(err.response?.data?.error || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
