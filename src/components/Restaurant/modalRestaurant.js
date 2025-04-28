import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalRestaurantBasedOnCusine from "./modalRestaurantBasedOnCusine";

// import Cusine from './cusine'

export default function ModalRestaurant(props) {
  const [modalRestaurantBasedOnCusine, setModalRestaurantBasedOnCusine] =
    useState(false);
  const [cusineSelected, setCusineSelected] = useState(null);
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [search, setSearch] = useState("");
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
        const response = await axios.get("http://127.0.0.1:8000/restaurant/all_cusine?longitude=" + props.longitude + "&latitude=" + props.latitude);
        setData(response.data.sort());
        setFilteredInfo(response.data.sort());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.modalrestaurant) {
      fetchData();
    } else {
      setSearch("")
      setData([]);
      setFilteredInfo([]);
      setLoading(true);
    }
  }, [props.latitude, props.longitude, props.modalrestaurant]);

  return (
    <>
      <ModalRestaurantBasedOnCusine
        show={modalRestaurantBasedOnCusine}
        onHide={() => {
          setCusineSelected(null);
          props.setmodalrestaurant(true);
          setModalRestaurantBasedOnCusine(false);
        }}
        cusine={cusineSelected}
        modalRestaurantBasedOnCusine={modalRestaurantBasedOnCusine}
        setModalRestaurantBasedOnCusine={setModalRestaurantBasedOnCusine}
        longitude={props.longitude}
        latitude={props.latitude}
        email={props.email}
      />

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            All Cusines available near your location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? <div>Loading...</div> :
            <div>
              <input type="text" value={search} onChange={handleChange} />

              {filteredInfo.map((item, index) => (
                <Button
                  variant="light"
                  key={index}
                  style={{ margin: "2px" }}
                  onClick={() => {
                    props.setmodalrestaurant(false);
                    setCusineSelected(item);
                    setModalRestaurantBasedOnCusine(true);
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
