import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";

export const Controls = ({ token, getCurrentTrack }) => {
  const [playState, setPlayState] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [deviceID, setDeviceID] = useState("");

  useEffect(() => {
    // START OF SDK INIT
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Erikka's Lite Spotify",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceID(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
      player.getCurrentState().then(state => {
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }

        console.log('Currently Playing',state );
      });


    };
    // END OF SDK INIT

    const currentState = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      setPlayState(response.data.is_playing);
      // console.log("CHANGE STATE",  response);
    };

    currentState();
  }, [token]);

  // START OF PLAY / PAUSE STATE
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
  // END OF PLAY / PAUSE STATE

  // START OF CHANGE TRACK
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

    if (changeResponse.status === 204 || changeResponse.status === 202) {
      setTimeout(async () => {
        await getCurrentTrack();
      }, 200);
    }
  };
  // END OF CHANGE TRACK

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
