import React, { useState, useEffect } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioUrl = "music/enter_bgm.mp3";

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const audioElement = document.querySelector("audio");
      audioElement.play();
    }
  }, [isPlaying]);

  return (
    <div>
      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio controls autoPlay={isPlaying}>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicPlayer;
