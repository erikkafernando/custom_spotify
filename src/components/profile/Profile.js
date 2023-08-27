import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, Flag, Segment, List, Grid } from "semantic-ui-react";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState("");
  const [profImg, setProfImg] = useState("");
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [firstArtist, setFirstArtist] = useState({});
  const [firstTrack, setFirstTrack] = useState({});
  const [firstArtistImg, setFirstArtistImg] = useState({});
  const [firstTrackImg, setFirstTrackImg] = useState({});

  // set first artist image
  useEffect(() => {
    if (firstArtist.images && firstArtist.images[1]) {
      setFirstArtistImg(firstArtist.images[1]);
    }
  }, [firstArtist]);

  useEffect(() => {
    if (firstTrack.album && firstTrack.album.images[1]) {
      setFirstTrackImg(firstTrack.album.images[1]);
    }
  }, [firstTrack]);

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
    };

    // get top items
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

      setTopArtists(artists.items.slice(1));
      setFirstArtist(artists.items[0]);

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

      setTopTracks(tracks.items.slice(1));
      setFirstTrack(tracks.items[0]);
    };

    getTopItems();
    getProfile();
  }, [token]);

  return (
    <div className="profile">
      <div className="profile-main">
        <div className="prof-img">
          <Image
            src={profImg.url}
            alt="spotify profile"
            size="medium"
            rounded
          />
        </div>

        <div className="prof-details">
          <h1 className="display-name">{profile.display_name}</h1>
          <span className="prof-desc">{profile.id}</span>
          <span className="prof-desc">{profile.email}</span>
          <span className="prof-desc">
            <Flag name="ph" />
            {profile.country}
          </span>
          <span className="prof-desc">{profile.product}</span>
        </div>
      </div>

      <div className="top-items">
        <Grid>
          <Grid.Row verticalAlign="bottom">
            <Grid.Column width={8}>
              <div id="top-artists-div">
                <div id="first-item-div">
                  <Image src={firstArtistImg.url} alt="top artist" rounded/>
                  <h2>{firstArtist.name}</h2>
                </div>
                <div id="artist-list-div">
                  <List>
                    {topArtists.map((artist, index) => (
                      <List.Item key={index}>
                        <Segment>
                          <div className="item-segment">
                            <Image
                              className="item-img"
                              src={artist.images[2].url}
                              alt="top artist"
                              size="tiny"
                              rounded
                            />
                            {artist.name}
                          </div>
                        </Segment>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div id="top-tracks-div">
                <div id="first-item-div">
                  <Image src={firstTrackImg.url} alt="top track" rounded/>
                  <h2>{firstTrack.name}</h2>
                </div>
                <div id="track-list-div">
                  <List>
                    {topTracks.map((track, index) => (
                      <List.Item key={index}>
                        <Segment>
                          <div className="item-segment">
                            <Image
                              className="item-img"
                              src={track.album.images[2].url}
                              alt="top track"
                              size="tiny"
                              rounded
                            />
                            {track.name}
                          </div>
                        </Segment>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
