import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import './FavoriteEvents.css'

const FavoriteEvents = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, token] = useAuth();
  // const [events, setEvents] = useState([]);

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
      <div className="FavoriteEventTitle">Favorite Events:</div>
    
        <ul>
          {props.favoriteEvent.map((f) => {
            return (
                <Card style={{ width: "50%", overflow: "scroll", height: "300px" }}><div>
                <Card.Body>
                  <li key={f.id}>
                    <div> Start Date: {f.event.start_date}</div>
                    <div>End Date: {f.event.end_date}</div>
                    <div>Title: {f.event.title}</div>
                    <div>Description: {f.event.content}</div>
                    <div>Category: {f.event.category}</div>
                    <div>Address: {f.event.address}</div>
                    <div>Zip code: {f.event.zip_code}</div>
                    <button onClick={() => handleDelete(f.id)}>
                      Delete Event
                    </button>
                  </li>
                </Card.Body>
              </div> </Card>
            );
          })}
        </ul>
     
      {/* <div>
        <div>
          <div>
            <Link to="/">
              <button >
                Back to Home
              </button>
            </Link>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            aspectRatio= {6}
            height={400}
            
            editable={true}
            selectable={true}
            selectMirror={true}
            events={props.favoriteEvent}
          />
        </div>
      </div> */}
    </div>
  );
};

export default FavoriteEvents;
