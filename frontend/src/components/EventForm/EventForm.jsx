import React, { useState } from "react";
import Popup from "../Popup/Popup";

const EventForm = (props) => {
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState ("")
  const [category, setCategories] = useState ("")
  const [zipCode, setZipCode] = useState ("")
  const [buttonPopup, setButtonPopup] = useState(false);

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
        <button onClick={() => setButtonPopup(true)}>Add Event</button>
      </main>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <input
            type="text"
            value={category}
            onChange={(event) => setCategories(event.target.value)}
          />
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <input
            type="text"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
          />
          <button>Add Event</button>
        </form>
      </Popup>
    </div>
  );
};

export default EventForm;