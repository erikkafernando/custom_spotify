import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, Flag } from "semantic-ui-react";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState("");
  const [profImg, setProfImg] = useState("");
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);


  useEffect(() => {
    const getTopItems = async () => {
      const res_artists = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5&offset=0",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const artists = res_artists.data;
      console.log("ARTISTS", artists.items);
      setTopArtists(artists.items);

      const res_tracks = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5&offset=0",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const tracks = res_tracks.data;
      console.log("TRACKS", tracks);
      setTopTracks(tracks.items);
    };

    getTopItems();
  }, []);

  useEffect(() => {
    // get profile function
    const getProfile = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const res = response.data;
      let img = res.images[1];
      setProfImg(img);
      setProfile(res);
      console.log("asdf", res);
    };
    getProfile();
  }, [token]);

  

  return (
    <div className="profile">
      <div className="prof-img">
        <Image src={profImg.url} alt="spotify profile" size="medium" circular />
      </div>

      <div className="prof-details">
        <h1>{profile.display_name}</h1>
        <span>{profile.id}</span>
        <span>{profile.email}</span>
        <span>
          <Flag name="ph" />
          {profile.country}
        </span>
        <span>{profile.product}</span>
      </div>
    </div>
  );
};

export default Profile;
