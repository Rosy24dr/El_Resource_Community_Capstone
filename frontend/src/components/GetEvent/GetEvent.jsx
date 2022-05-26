import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EventForm from "../EventForm/EventForm"
import SearchBar from "../SearchBar/SearchBar";
import FavoriteEvents from "../FavoriteEvents/FavoriteEvents";

const favoriteList = [];

const GetEvent = (props) => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);
  const [favoriteEvent, setFavoriteEvent] = useState([]);
  

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
      console.log(result)
    } catch (error) {
      console.log(error.message);
    }
  };

  const addEvent = async (newEvent) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/event/create/",
        newEvent,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getEvents();
    } catch (error) {
      console.log(newEvent);
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
  };

  function handleDelete(event) {
    let response = prompt(
      "Are you sure you would like to delete this event? "
    ).toLowerCase();
    if (response === "yes") {
      deleteEvent(event);
    }
  }

  const getFavoriteEvents = async (favoriteEvent) => {
    try {
      let result = await axios.get(
        "http://127.0.0.1:8000/api/favoriteevents/",
        favoriteEvent,
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

  function handleChange(event) {
    setEvents(event.target.value)
  }

  function handleAdd() {
    const newFavoriteEvent = favoriteEvent.concat({ events });
    setFavoriteEvent(newFavoriteEvent)  
    console.log(newFavoriteEvent)  
  }
  return (
    <div>
  
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
              <button value={events} onChange={handleChange} onClick={handleAdd}>Favorite</button>
              <button onClick={() => handleDelete(e.id)}>Delete Event</button>
            </div> 
          );
        }
      )}
       <SearchBar events={events} setEvents={setEvents}/>
       <FavoriteEvents favoriteEvent={favoriteEvent}/>
       <EventForm addEvent= {addEvent} user={user} />
     
    </div>
    
  );
};

export default GetEvent;