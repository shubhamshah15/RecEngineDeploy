import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ModalRestaurantBasedOnCusine(props) {
  const [data, setData] = useState([]);
  const [rest, setRest] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/restaurant/insert?rest_id=" + props.restId + "&email=" + props.email);
        setData(response.data);

        response = await axios.get("http://127.0.0.1:8000/restaurant/similar?rest_id=" + props.restId + "&longitude=" + props.longitude + "&latitude=" + props.latitude);
        setData(response.data);

        response = await axios.get("http://127.0.0.1:8000/restaurant/get_rest?rest_id=" + props.restId);
        setRest(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.modalRestaurantDetail) {
      fetchData();
    } else {
      setRest({});
      setData([]);
      setLoading(true);
    }
  }, [props.modalRestaurantDetail, props.restId, props.latitude, props.longitude, props.email]);

  const renderData = () => {
    const rows = [];

    for (let key in data) {
      rows.push(
        <Button
          variant="light"
          key={key}
          onClick={() => {
            props.setRestId(key);
            setLoading(true);
          }}
        >
          {data[key].name}
        </Button>
      );
    }
    return rows;
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Details of Restaurant
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? <div>Loading...</div> :
          <div>
            <p>Name : {rest.name}</p>
            <p>Address: {rest.address}</p>
            <p>Cusine: {rest.cusine}</p>
            <p>Rating: {rest.rating}</p>
            <p>Famous Food: {rest.famous_food}</p>
            <p>
              Zomato:
              <a href={rest.zomato_url} target="__blank">
                {" "}
                Link
              </a>
            </p>
            <h1> Similar Restaurants </h1>
            {renderData()}
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Back</Button>
      </Modal.Footer>
    </Modal>
  );
}
