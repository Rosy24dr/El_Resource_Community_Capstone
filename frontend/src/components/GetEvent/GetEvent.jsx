import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EventForm from "../EventForm/EventForm";
import SearchBar from "../SearchBar/SearchBar";
import FavoriteEvents from "../FavoriteEvents/FavoriteEvents";
import Popup from "../Popup/Popup";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./GetEvent.css"

const GetEvent = (props) => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);
  const [favoriteEvent, setFavoriteEvent] = useState([]);
  const [contentToUpdate, setContentToUpdate] = useState();
  const [startDateToUpdate, setStartDateToupdate] = useState();
  const [endDateToUpdate, setEndDateToupdate] = useState();
  const [idToUpdate, setIdToupdate] = useState();
  const [titleToUpdate, setTitleToupdate] = useState();
  const [categoriesToUpdate, setCategoriesToUpdate] = useState();
  const [addressToUpdate, setAddressToUpdate] = useState();
  const [zipCodeToUpdate, setZipCodeToUpdate] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    getEvents();
    getFavoriteEvents();
  }, []);

  const getEvents = async () => {
    try {
      let result = await axios.get("http://127.0.0.1:8000/api/event/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setEvents(result.data);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addEvent = async (newEvent) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/event/create/", newEvent, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      getEvents();
    } catch (error) {
      console.log(newEvent);
      console.log(error.message);
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      let result = await axios.put(
        `http://127.0.0.1:8000/api/event/${idToUpdate}/`,
        updatedEvent,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getEvents();
    } catch (error) {
      console.log(error.message);
    }
  };

  async function deleteEvent(event) {
    try {
      let result = await axios.delete(
        `http://127.0.0.1:8000/api/event/delete/${event}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getEvents();
    } catch (error) {
      console.log(error.message);
    }
  }

  const setEventToUpdate = (event) => {
    setButtonPopup(true);
    setIdToupdate(event.id);
    setContentToUpdate(event.content);
    setStartDateToupdate(event.start_date);
    setEndDateToupdate(event.end_date);
    setTitleToupdate(event.title);
    setCategoriesToUpdate(event.category);
    setAddressToUpdate(event.address);
    setZipCodeToUpdate(event.zip_code);
  };

  function handleUpdate(event) {
    event.preventDefault();
    let events = {
      user: user.id,
      start_date: startDateToUpdate,
      end_date: endDateToUpdate,
      title: titleToUpdate,
      content: contentToUpdate,
      category: categoriesToUpdate,
      address: addressToUpdate,
      zip_code: zipCodeToUpdate,
    };
    console.log(events);
    updateEvent(events);
  }

  function handleDelete(event) {
    let response = prompt(
      "Are you sure you would like to delete this event? "
    ).toLowerCase();
    if (response === "yes") {
      deleteEvent(event);
    }
  }

  const getFavoriteEvents = async () => {
    try {
      let result = await axios.get(
        `http://127.0.0.1:8000/api/favoriteevents/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setFavoriteEvent(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addFavoriteEvent = async (newFavoriteEvent_id) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/favoriteevents/create/" +
          newFavoriteEvent_id +
          "/",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getFavoriteEvents();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  function handleFavorite(id) {
    addFavoriteEvent(id);
  }

  return (
    <div>   
      <SearchBar  events={events} setEvents={setEvents} getEvents={getEvents} />
      <Card><FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            aspectRatio={6}
            height={400}
            width={300}
          /></Card>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleUpdate}>
          <input
            type="date"
            value={startDateToUpdate}
            onChange={(event) => setStartDateToupdate(event.target.value)}
          />
          <input
            type="date"
            value={endDateToUpdate}
            onChange={(event) => setEndDateToupdate(event.target.value)}
          />
          <input
            type="text"
            value={titleToUpdate}
            onChange={(event) => setTitleToupdate(event.target.value)}
          />
          <input
            type="text"
            value={contentToUpdate}
            onChange={(event) => setContentToUpdate(event.target.value)}
          />
          <input
            type="text"
            value={categoriesToUpdate}
            onChange={(event) => setCategoriesToUpdate(event.target.value)}
          />
          <input
            type="text"
            value={addressToUpdate}
            onChange={(event) => setAddressToUpdate(event.target.value)}
          />
          <input
            type="text"
            value={zipCodeToUpdate}
            onChange={(event) => setZipCodeToUpdate(event.target.value)}
          />
          {user.is_superuser ? <button>Edit Event</button> : null}
        </form>
      </Popup>

      {/* <ListGroup>
        <ListGroup.Item> */}
        {/* <Stack direction="horizontal" gap={3}> */}
          {events.map((e) => {
            return (
              <div key={e.id} className="eventMapping">
                <div>Title: {e.title}</div>
                <div>Start Date: {e.start_date}</div>
                <div>End Date: {e.end_date}</div>
                <div>Description: {e.content}</div>
                <div>Category: {e.category}</div>
                <div>Address: {e.address}</div>
                <div>Zip code: {e.zip_code}</div>
                <button onClick={() => handleFavorite(e.id)} className="eventButtons">Favorite</button>
                {user.is_superuser ? <button onClick={() => setEventToUpdate(e)} className="eventButtons">Edit Event</button> : null}
                {user.is_superuser ? <button onClick={() => handleDelete(e.id)} className="eventButtons">Delete Event</button> : null}
                <hr/>
              </div>
            );
          })}
        {/* </ListGroup.Item>
      </ListGroup> */}
   

      <EventForm addEvent={addEvent} user={user} />
      {favoriteEvent && (
        <FavoriteEvents
          favoriteEvent={favoriteEvent}
          getFavoriteEvents={getFavoriteEvents}
        />
      )}
    </div>
  );
};

export default GetEvent;
