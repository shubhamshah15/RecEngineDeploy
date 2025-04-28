import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ModalArtistSongs(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const insert = (songId) => {
    axios.get(`http://127.0.0.1:8000/song/insert?email=${props.email}&songId=${songId}&artistId=${props.artistId}&genre=${props.genre}`)
      .then((response) => { console.log(response.data); })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/song/get_songs_by_artistId?artist_id=" + props.artistId);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.showSongs) {
      fetchData();
    } else {
      setData([]);
      setLoading(true);
    }
  }, [props.showSongs, props.artistId]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Songs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? <div>Loading...</div> :
            <div>
              {data.map((item, index) => (
                <>
                  <Row>
                    <Col xs={3}>
                      <img
                        style={{ height: "150px", width: "150px" }}
                        src={item.album.images[1].url}
                      />
                    </Col>
                    <Col>
                      <p>Name: {item.name}</p>
                      <p>
                        Link to song:{" "}
                        <a
                          onClick={() => {
                            insert(item.id);
                          }}
                          target="__blank"
                          href={item.external_urls.spotify}
                        >
                          Link
                        </a>
                      </p>
                      <p>
                        Preview:{" "}
                        <a target="__blank" href={item.preview_url}>
                          Link
                        </a>
                      </p>
                    </Col>
                  </Row>
                  <hr></hr>
                </>
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
