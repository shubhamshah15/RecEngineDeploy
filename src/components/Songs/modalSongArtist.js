import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalArtistSongs from "./modalArtistSongs";

export default function ModalSongArtist(props) {
  const [data, setData] = useState([]);
  const [showSongs, setShowSongs] = useState(false);
  const [artistId, setArtistId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/song/get_artist_by_genre?genre=" + props.genre);
        setData(response.data.sort());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.artist) {
      fetchData();
    } else {
      setData([]);
      setLoading(true);
    }
  }, [props.artist, props.genre]);

  return (
    <>
      <ModalArtistSongs
        show={showSongs}
        onHide={() => {
          props.setShowArtist(true);
          setArtistId(null);
          setShowSongs(false);
        }}
        showSongs={showSongs}
        artistId={artistId}
        email={props.email}
        genre={props.genre}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Artists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? <div>Loading...</div> :
            <div>
              {/* <input type="text" value={search} onChange={handleChange} /> */}

              {data.map((item, index) => (
                <Button
                  style={{ margin: "5px" }}
                  onClick={() => {
                    setShowSongs(true);
                    props.setShowArtist(false);
                    setArtistId(item.id);
                  }}
                  variant="light"
                  key={index}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
