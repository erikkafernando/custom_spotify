import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ token, setToken }) => {
  // const searchArtists = async (e) => {
  //   e.preventDefault();
  //   const { data } = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "artist",
  //     },
  //   });

  //   setArtists(data.artists.items);
  // };

  const[playlists, setPLaylists] = useState([]);

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      console.log("HERE", items)
      const pl = items.map(({ name, id }) => {
        return { name, id };
      });

      console.log("here", pl);
      setPLaylists(pl);
    };
    getPlaylistData();
  }, [token]);

  return (
    <div className="dashboard">
      <h1> WELCOME </h1>

      <ul>
        {playlists.map(({ name, id }) => {
          return (
            <li key={id} >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
