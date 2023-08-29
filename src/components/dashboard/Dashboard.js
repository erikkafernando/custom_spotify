import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, Card, Grid, Segment } from "semantic-ui-react";

const Dashboard = ({ token, profile }) => {
  const [playlists, setPLaylists] = useState([]);

 const croppedImage = {
    width: "100%",
    height: "200px",
    backgroundSize: "cover", /* Crop the image to cover the container */
    backgroundPosition: "center center" /* Center the image */
  };

  const fixedCardSize ={
      height: "250px",
      overflow: "hidden"
  };

  const shortenDesc = { 
    textOverflow: "ellipsis",
    width: "100%",
    whiteSpace: "nowrap", 
    overflow: "hidden" 
};

const headerStyle = {
  color: "white",
  background:
    "linear-gradient(94deg, rgba(119,172,207,1) 1%, rgba(218,181,230,1) 75%)",
  borderRadius: "5px",
};

  useEffect(() => {

    // get playlist data
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists?limit=15&offset=0",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      // console.log("HERE", items);
      // console.log("prof", profile);
      setPLaylists(items);
    };

    
    getPlaylistData();
  }, [token]);

  const renderPlaylists = () => {
    const rows = [];
    const totalItems = 15;

    for (let i = 0; i < totalItems; i += 5) {
      const rowItems = playlists.slice(i, i + 5).map((item, index) => (
        <Grid.Column key={index}>
          <Card style={fixedCardSize} onClick={() => onPlaylistClick(item)}>
            <Image 
            src={item.images[0].url} 
            alt={item.name} 
            size="small" 
            style={croppedImage}
            
            />
            <Card.Content>
              <Card.Header style={shortenDesc}>{item.name}</Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
      ));

      rows.push(<Grid.Row key={i}>{rowItems}</Grid.Row>);
    }

    return rows;
  };

  const onPlaylistClick = async (item) =>{
    let tracksHref = item.tracks.href;

    const response = await axios.get(
      tracksHref,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const { items } = response.data;
    console.log("tracks here", items);

  }

  return (
    <div className="dashboard">
      <p className="pl-text">Home</p>
      <div className="welcome-div-main">
        <Segment style={headerStyle}>
          <div className="text-container" >
            <p className="greeting">Howdy, {profile.display_name}!</p>
            <p className="compliment">You got a pretty good taste in music</p>
          </div>
        </Segment>
      </div>

      <p className="pl-text2">Your top playlists</p>
      <div className="main-playlist-container">
        <Grid columns={5}>
          {renderPlaylists()}
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
