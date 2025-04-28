import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalRestaurantDetail from "./modalRestaurantDetail";


export default function ModalRestaurantBasedOnCusine(props) {
  const [data, setData] = useState({});
  const [restId, setRestId] = useState(0);
  const [modalRestaurantDetail, setModalRestaurantDetail] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/restaurant/get_cusine?cusine=" + props.cusine + "&longitude=" + props.longitude + "&latitude=" + props.latitude);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.modalRestaurantBasedOnCusine) {
      fetchData();
    } else {
      setData([]);
      setLoading(true);
    }
  }, [props.modalRestaurantBasedOnCusine, props.cusine, props.latitude, props.longitude]);

  const renderData = () => {
    const rows = [];

    for (let key in data) {
      rows.push(
        <Button
          variant="light"
          key={key}
          onClick={() => {
            setRestId(key);
            props.setModalRestaurantBasedOnCusine(false);
            setModalRestaurantDetail(true);
          }}
        >
          {data[key].name}
        </Button>
      );
    }
    return rows;
  };

  return (
    <>
      <ModalRestaurantDetail
        show={modalRestaurantDetail}
        onHide={() => {
          setRestId(0);
          props.setModalRestaurantBasedOnCusine(true);
          setModalRestaurantDetail(false);
        }}
        email={props.email}
        restId={restId}
        modalRestaurantDetail={modalRestaurantDetail}
        setRestId={setRestId}
        longitude={props.longitude}
        latitude={props.latitude}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.cusine}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? <div>Loading...</div> : renderData()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Back</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
