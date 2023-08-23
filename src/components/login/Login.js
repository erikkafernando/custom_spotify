import React from "react";
import { Button } from "semantic-ui-react";
import config from "../config"

const redirect_uri = "http://localhost:3000/";
const api_url = "https://accounts.spotify.com/authorize";
const scope = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "app-remote-control",
  "streaming"
];

function Login() {
  

  const handleLogin = async() =>{

    window.location.href = `${api_url}?client_id=${config.clientId}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  }
    

  return (
    <div className="login">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
        height={"200vh"}
      />
      <Button color="green" size="large" onClick={handleLogin}>
        Login with Spotify
      </Button>
    </div>
  );
}

export default Login;
