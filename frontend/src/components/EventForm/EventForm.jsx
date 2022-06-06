import React, { useState } from "react";
import Popup from "../Popup/Popup";
import useAuth from "../../hooks/useAuth";
import "./EventForm.css"

const EventForm = (props) => {
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState ("")
  const [category, setCategories] = useState ("")
  const [zipCode, setZipCode] = useState ("")
  const [buttonPopup, setButtonPopup] = useState(false);
  const [user, token] = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    let newEvent = {
      user: props.user.id,
      start_date: startDate,
      end_date: endDate,
      title:title,
      content: content,
      category: category,
      address: address,
      zipCode: zipCode,
    };
    props.addEvent(newEvent);
  }

  return (
    <div>
      <main>
      {user.is_superuser ? <button onClick={() => setButtonPopup(true) } className="eventForm-btn">Add Event</button> : null}
      </main>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleSubmit}>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
          <input
            type="text"
            value={title}
            placeholder="ADD TITLE"
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            value={content}
            placeholder="ADD DESCRIPTION"
            onChange={(event) => setContent(event.target.value)}
          />
          <input
            type="text"
            value={category}
            placeholder="ADD CATEGORY"
            onChange={(event) => setCategories(event.target.value)}
          />
          <input
            type="text"
            value={address}
            placeholder="ADD ADDRESS"
            onChange={(event) => setAddress(event.target.value)}
          />
          <input
            type="text"
            value={zipCode}
            placeholder="ADD ZIP CODE"
            onChange={(event) => setZipCode(event.target.value)}
          />
          {user.is_superuser ? <button className="eventForm-btn">Add Event</button> : null}
        </form>
      </Popup>
    </div>
  );
};

export default EventForm;