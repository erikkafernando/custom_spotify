import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";

export const Controls = ({ token, track, getCurrentTrack }) => {
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    const currentState = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      setPlayState(response.data.is_playing);
    };

    currentState();
  }, [token]);

  const changeState = async () => {
    const state = playState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    setPlayState(!playState);
  };

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
        {playState ? (
          <Button
            circular
            icon="pause"
            size="large"
            onClick={() => changeState()}
          />
        ) : (
          <Button
            circular
            icon="play"
            size="large"
            onClick={() => changeState()}
          />
        )}
      </div>
      <div className="next" onClick={() => changeTrack("next")}>
        <Icon name="forward" size="large" />
      </div>
    </div>
  );
};
