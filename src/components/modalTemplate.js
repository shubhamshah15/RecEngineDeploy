import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function ModalTemplate(props) {


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/song/get_artist_by_genre')
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          About US
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>A brief Introduction about our project:</h4>
        <p>
        With the increasing amount of information that people browse daily, how to quickly obtain Information Items that meet people’s needs has become an urgent issue these days. The effort in information retrieval has brought great convenience to people who tend to retrieve information by entering a query or keywords. If some information-intensive websites can proactively suggest products or information items that users may be interested in, it will greatly improve the efficiency and satisfaction of users in obtaining information items. The research in the field of recommender systems precisely originated on this subject. Over the past years, tremendous progress has been made into this area, from non-personalised to personalized and to more recent deep learning recommender systems. Although recommender systems have been widely applied, there are still many issues and challenges in designing high quality recommender systems. To measure the quality of a recommender system, a scientific and rigorous evaluation process is required. The project aims to provide a comprehensive platform for all so that it becomes easier to find everything in just a couple of clicks.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}