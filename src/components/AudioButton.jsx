import { useState, useRef } from 'react';

export default function AudioButton({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mpeg" />
      </audio>

      <button
        id="playPauseButton"
        onClick={toggleAudio}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        <i
          className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}
          id="playPauseIcon"
        ></i>
      </button>
    </>
  );
}
