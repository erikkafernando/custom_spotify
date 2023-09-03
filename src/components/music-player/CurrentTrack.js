import React from "react";
// import axios from "axios";

import { Image } from "semantic-ui-react";

export const CurrentTrack = ({ track }) => {
  const shorten = {
    textOverflow: "ellipsis",
    width: "220px",
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  return (
    <div className="current-track">
      <div className="ct-image">
        <Image src={track.imageurl} rounded />
      </div>

      <div className="ct-name-artist">
        <p className="ct-name" style={shorten}>
          {track.name}
        </p>
        <p className="ct-artist" style={shorten}>
          {track.artist}
        </p>
      </div>
    </div>
  );
};

export default CurrentTrack;
