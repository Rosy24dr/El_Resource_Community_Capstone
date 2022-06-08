import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Card } from "react-bootstrap";
import "./FavoriteEvents.css";

const FavoriteEvents = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, token] = useAuth();


  useEffect(() => {
    console.log("rerender");
    setLoading(false);
  }, [props]);

  async function deleteFavoriteEvent(event) {
    try {
      let result = await axios.delete(
        `http://127.0.0.1:8000/api/favoriteevents/delete/${event}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      props.getFavoriteEvents();
    } catch (error) {
      console.log(error.message);
    }
  }
  function handleDelete(event) {
    let response = prompt(
      "Are you sure you would like to delete this favorite event? "
    ).toLowerCase();
    if (response === "yes") {
      deleteFavoriteEvent(event);
    }
  }

  return (
    <div>
      <ul>
        {props.favoriteEvent.map((f) => {
          return (
            <Card style={{ width: "50%", overflow: "scroll", height: "300px", margin:"1%", marginTop:"-1%"}}>
              <div>
                <Card.Body className="favoriteEvents">
                  <li key={f.id}>
                    <div> Start Date: {f.event.start_date}</div>
                    <div>End Date: {f.event.end_date}</div>
                    <div>Title: {f.event.title}</div>
                    <div>Description: {f.event.content}</div>
                    <div>Category: {f.event.category}</div>
                    <div>Address: {f.event.address}</div>
                    <div>Zip code: {f.event.zip_code}</div>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="favoriteEvent-btn"
                    >
                      Delete Event
                    </button>
                  </li>
                </Card.Body>
              </div>{" "}
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export default FavoriteEvents;
