import React, { useState, useEffect } from "react";
import { Image, List, Modal, Segment, Loader, Dimmer } from "semantic-ui-react";
import axios from "axios";

const PlaylistModal = ({ token, info, onClose }) => {
  const [playlistData, setPlaylistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const noImageUrl =
    "https://developer.spotify.com/images/guidelines/design/icon3@2x.png";

  const shorten = {
    textOverflow: "ellipsis",
    width: "270px",
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  useEffect(() => {
    const getTracks = async () => {
      setIsLoading(true);
      const response = await axios.get(info.href, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const { items } = response.data;

      setPlaylistData(items);
      setIsLoading(false);
    };

    getTracks();
  }, [token]);

  return (
    <Modal id="playlist-modal" open onClose={onClose} closeIcon>
      <Modal.Header>{info.name}</Modal.Header>

      <Modal.Content image scrolling>
        <Image size="medium" src={info.img} wrapped />
        <Modal.Description>
          <p className="pl-desc">{info.desc}</p>

          <div className="modal-tracks-div">
            {isLoading === false && (
              <List>
                {playlistData.map((track, index) => (
                  <List.Item key={index}>
                    <Segment raised>
                      <div className="modal-track-item">
                        <div className="track-number">
                          <p className="t-number">{index + 1}</p>
                        </div>

                        <Image
                          className="track-img"
                          src={
                            track.track.album.images.length > 0
                              ? track.track.album.images[2].url
                              : noImageUrl
                          }
                          size="mini"
                        />
                        <div className="track-title-artist">
                          <p className="t-title" style={shorten}>
                            {track.track.name}
                          </p>
                          <p className="t-artist" style={shorten}>
                            {track.track.artists[0].name}
                          </p>
                        </div>
                        <div className="track-album">
                          <p className="t-album" style={shorten}>{track.track.album.name}</p>
                        </div>
                      </div>
                    </Segment>
                  </List.Item>
                ))}
              </List>
            )}

            {isLoading === true && (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            )}
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default PlaylistModal;
