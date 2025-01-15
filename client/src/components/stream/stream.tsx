import React from "react";
import ReactPlayer from "react-player";
import "./stream.style.css";

const Stream: React.FC = () => {
  return (
    <div className="streamBox">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ZKEqqIO7n-k&ab_channel=WebDevSimplified"
        playing
        muted
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Stream;
