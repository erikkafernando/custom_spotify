import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Image,
  Flag,
  Segment,
  List,
  Grid,
  Label,
  Icon,
} from "semantic-ui-react";

const Profile = ({ token, profile, profImg }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [firstArtist, setFirstArtist] = useState({});
  const [firstTrack, setFirstTrack] = useState({});
  const [firstArtistImg, setFirstArtistImg] = useState({});
  const [firstTrackImg, setFirstTrackImg] = useState({});
  const [following, setFollowing] = useState("");

  const customColorList = {
    color: "white",
    // background: "rgb(119,172,207)",
    background:
      "linear-gradient(94deg, rgba(119,172,207,1) 1%, rgba(218,181,230,1) 75%)",
    borderRadius: "5px",
  };

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
    // get following function
    const getFollows = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/following?type=artist",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const res = response.data.artists;
      setFollowing(res.total);
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
    getFollows();
  }, [token]);

  return (
    <div className="profile">
      <div className="profile-main">
        <div className="prof-img">
          <Image
            src={profImg.url}
            alt="spotify profile"
            size="medium"
            circular
          />
        </div>

        <div className="prof-details">
          <span className="prof-desc">PROFILE</span>
          <h1 className="display-name">{profile.display_name}</h1>
          <span className="prof-desc">{profile.id}</span>
          <span className="prof-desc">
            <Flag name="ph" />
            {profile.country}
          </span>
          <div>
            <Label as="a">
              <Icon name="music" />
              {following} Following
            </Label>
          </div>
        </div>
      </div>

      <div className="top-items">
        <Grid columns={2} relaxed="very">
          <Grid.Row verticalAlign="bottom">
            <Grid.Column width={8}>
              <p className="top-segment-text">Top artists</p>
              <div id="top-artists-div">
                <div id="first-item-div">
                  <Image
                    src={firstArtistImg.url}
                    alt="top artist"
                    size="small"
                    rounded
                  />
                  <p className="first-item-txt">{firstArtist.name}</p>
                </div>
                <div id="artist-list-div">
                  <List>
                    {topArtists.map((artist, index) => (
                      <List.Item key={index}>
                        <Segment inverted style={customColorList} raised>
                          <div className="item-segment">
                            <Image
                              className="item-img"
                              src={artist.images[2].url}
                              alt="top artist"
                              size="mini"
                              rounded
                            />
                            <p className="artist-name">{artist.name}</p>
                          </div>
                        </Segment>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <p className="top-segment-text">Top tracks</p>
              <div id="top-tracks-div">
                <div id="first-item-div">
                  <Image
                    src={firstTrackImg.url}
                    alt="top track"
                    size="small"
                    rounded
                  />
                  <p className="first-item-txt">{firstTrack.name}</p>
                </div>
                <div id="track-list-div">
                  <List>
                    {topTracks.map((track, index) => (
                      <List.Item key={index}>
                        <Segment inverted style={customColorList} raised>
                          <div className="item-segment">
                            <Image
                              className="item-img"
                              src={track.album.images[2].url}
                              alt="top track"
                              size="mini"
                              rounded
                            />
                            <div className="track-details">
                              <div className="track-text">
                                <span>{track.name}</span>
                              </div>
                              <div className="track-text">
                                <p>{track.artists[0].name}</p>
                              </div>
                            </div>
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
