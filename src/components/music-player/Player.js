import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { Segment } from "semantic-ui-react";
import { CurrentTrack } from "./CurrentTrack";
import { Controls } from "./Controls";

const Player = ({ token }) => {
  const [track, setTrack] = useState({});

  const trackSetter = (trackObject) => {
    let artist = trackObject.artists.map((artist) => artist.name);
    setTrack({
      name: trackObject.name,
      album: trackObject.album.name,
      imageurl: trackObject.album.images[2].url,
      artist: artist.join(", "),
    });
  };

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
        // get currently playing item
        const curr_track = response.data.item;
        trackSetter(curr_track);
      }else{
        // get most recentlyp played item if there is no currently playing item
        const lastTrack = await lastPlayed();
        trackSetter(lastTrack);
      }
    } catch (error) {
      console.error("Error getting current track:", error);
    }
  }, [token]);

  const lastPlayed = async () => {
    const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
   return response.data.items[0].track;
  }

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
