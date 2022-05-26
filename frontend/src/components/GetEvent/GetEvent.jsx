import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EventForm from "../EventForm/EventForm";
import SearchBar from "../SearchBar/SearchBar";
import FavoriteEvents from "../FavoriteEvents/FavoriteEvents";
import Popup from "../Popup/Popup";
import Item from "antd/lib/list/Item";

const favoriteList = [];

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

  const getFavoriteEvents = async (id) => {
    try {
      let result = await axios.get(
        `http://127.0.0.1:8000/api/favoriteevents/${id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      props.setFavoriteEvent(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addFavoriteEvent = async (newFavoriteEvent) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/favoriteevents/create/",
        newFavoriteEvent,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getFavoriteEvents();
    } catch (error) {
      console.log(newFavoriteEvent);
      console.log(error.message);
    }
  };

  // function handleChange(event) {
  //   setEvents(event.target.value);
  // }

  function handleFavorite(id) {
    // const newFavoriteEvent = favoriteEvent.concat({ events });
    setFavoriteEvent([...favoriteEvent, events.find((event) => id === id)]);
    // if(!copy) {setEvents(events.filter(event => Item.id !== id){
    addFavoriteEvent(id);
  }

  return (
    <div>
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
          <button>Edit Event</button>
        </form>
      </Popup>
      {events.map((e) => {
        return (
          <div>
            <div key={e.id}>{e.start_date}</div>
            <div>{e.end_date}</div>
            <div>{e.title}</div>
            <div>{e.content}</div>
            <div>{e.category}</div>
            <div>{e.address}</div>
            <div>{e.zip_code}</div>
            <button
              onClick={() => handleFavorite(e.id)}
              value={favoriteEvent}
              // onChange={handleChange}
            >
              Favorite
            </button>
            <button onClick={() => setEventToUpdate(e)}>Edit Event</button>
            <button onClick={() => handleDelete(e.id)}>Delete Event</button>
          </div>
        );
      })}
      <SearchBar events={events} setEvents={setEvents} />
      <FavoriteEvents
        favoriteEvent={favoriteEvent}
        setFavoriteEvent={setFavoriteEvent}
      />
      <EventForm addEvent={addEvent} user={user} />
    </div>
  );
};

export default GetEvent;
