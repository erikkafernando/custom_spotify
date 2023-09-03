import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { Segment } from "semantic-ui-react";
import { CurrentTrack } from "./CurrentTrack";
import { Controls } from "./Controls";

const Player = ({ token }) => {
  const [track, setTrack] = useState({});

 

  const getCurrentTrack = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data !== "") {
        const curr_track = response.data.item;
        let artist = curr_track.artists.map((artist) => artist.name);
        setTrack({
          name: curr_track.name,
          album: curr_track.album.name,
          imageurl: curr_track.album.images[2].url,
          artist: artist.join(", "),
        });
      }
    } catch (error) {
      console.error("Error getting current track:", error);
    }
  }, [token]);

  useEffect(() => {
    getCurrentTrack();
  }, [getCurrentTrack]);

  return (
    <div className="player">
      <Segment raised>
        <CurrentTrack
          token={token}
          track={track}
          setTrack={setTrack}
          getCurrentTrack={getCurrentTrack}
        />
        <Controls
          token={token}
          track={track}
          setTrack={setTrack}
          getCurrentTrack={getCurrentTrack}
        />
      </Segment>
    </div>
  );
};

export default Player;
