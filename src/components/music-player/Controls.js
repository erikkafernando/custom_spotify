import React from "react";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";

export const Controls = ({ token, track, getCurrentTrack }) => {
  const changeTrack = async (type) => {
    var changeResponse = await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (changeResponse.status === 204) {
      setTimeout(async () => {
        await getCurrentTrack();
      }, 300);
    }
  };

  return (
    <div className="controls">
      <div className="prev" onClick={() => changeTrack("previous")}>
        <Icon name="backward" size="large" />
      </div>
      <div className="play">
        <Button circular icon="play" size="large" />
      </div>
      <div className="next" onClick={() => changeTrack("next")}>
        <Icon name="forward" size="large" />
      </div>
    </div>
  );
};
