import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalMovieRec from "./modalMovieRec";

export default function ModalMovie(props) {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);


  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText.toLowerCase());
    if (searchText !== "") {
      const xyz = data.filter((item) => {
        return item.toLowerCase().includes(searchText);
      });
      setFilteredInfo(xyz.slice(0, 10));
    } else {
      setFilteredInfo([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/movie/get_MovieName");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.modalMovie) {
      fetchData();
    } else {
      setData([]);
      setFilteredInfo([]);
      setSearch("");
      setLoading(true);
    }
  }, [props.modalMovie]);

  return (
    <>
      <ModalMovieRec
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setName("");
          props.setModalMovie(true);
        }}
        name={name}
        showModal={showModal}
        setName={setName}
        email={props.email}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">All Movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ?
            <div>Loading...</div> :
            <div>
              Search for any Movie: <input type="text" value={search} onChange={handleChange} />{" "}
              <br />
              {filteredInfo.map((item, index) => (
                <Button
                  variant="light"
                  style={{ margin: "2px" }}
                  key={index}
                  onClick={() => {
                    setShowModal(true);
                    setName(item);
                    props.setModalMovie(false);
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
