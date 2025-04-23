import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Thay đổi nếu dùng domain khác

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/songs/`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Lỗi khi tải danh sách bài hát:", err));
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🎵 Trình phát nhạc</h1>

      {currentSong && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{currentSong.name}</h2>

          {/* Phát video nếu có, ngược lại phát audio */}
          {currentSong.video && currentSong.video.video_file ? (
            <video
              controls
              autoPlay
              className="w-full mt-2 rounded-lg shadow"
              src={`${currentSong.video.video_file}`}
            >
              Trình duyệt không hỗ trợ phát video.
            </video>
          ) : (
            <audio
              controls
              autoPlay
              className="w-full mt-2"
              src={`${currentSong.audio_file}`}
            >
              Trình duyệt không hỗ trợ phát nhạc.
            </audio>
          )}
        </div>
      )}

      <h3 className="text-lg font-semibold mt-6 mb-2">Danh sách bài hát:</h3>
      <ul className="space-y-2">
        {songs.map((song) => (
          <li
            key={song.id}
            className="border p-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => playSong(song)}
          >
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicPlayer;
