import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EventForm from "../EventForm/EventForm"
import SearchBar from "../SearchBar/SearchBar";

const GetEvent = (props) => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);

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
            </div> 
          );
        }
      )}
      <EventForm addEvent= {addEvent} user={user} />
      <SearchBar events={events} setEvents={setEvents}/>
    </div>
    
  );
};

export default GetEvent;