import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalSongArtist from "./modalSongArtist";

export default function ModalSong(props) {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setShowArtist] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    if (searchText !== "") {
      const xyz = data.filter((item) => {
        return item.toLowerCase().includes(searchText);
      });
      setFilteredInfo(xyz);
    } else {
      setFilteredInfo(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/song/get_allGenre");
        setData(response.data);
        setFilteredInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.modalSong) {
      fetchData();
    } else {
      setSearch("")
      setData([]);
      setFilteredInfo([]);
      setLoading(true);
    }
  }, [props.modalSong]);

  return (
    <>
      <ModalSongArtist
        show={artist}
        onHide={() => {
          setGenre("");
          props.setModalSong(true);
          setShowArtist(false);
        }}
        artist={artist}
        genre={genre}
        setShowArtist={setShowArtist}
        email={props.email}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Genres</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? <div>Loading...</div> :
            <div>
              Search: <input type="text" value={search} onChange={handleChange} />{" "}
              <br />
              {filteredInfo.map((item, index) => (
                <Button
                  variant="light"
                  style={{ margin: "2px" }}
                  key={index}
                  onClick={() => {
                    setGenre(item);
                    props.setModalSong(false);
                    setShowArtist(true);
                  }}
                >
                  {item}
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
