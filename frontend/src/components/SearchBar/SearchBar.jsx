import React, { useState } from "react";



const SearchBar = (props) => {
  const [eventSearch, setEventSearch] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    let filteredEvents= props.events.filter((e) => {
      if (e.start_date.includes(eventSearch)) {
        return true;
      } else if (e.end_date.includes(eventSearch)) {
        return true;
      } else if (e.title.includes(eventSearch)) {
        return true;
      }
    });
    props.setEvents(filteredEvents);
    setEventSearch("");
    if (eventSearch === "") {
      props.getEvents();
    }
  }

  return (
    <div >
      <div >
      </div>
      <form onSubmit={handleSearch}>
        <div>
          <input
            type="text"
            value={eventSearch}
            onChange={(e) => setEventSearch(e.target.value)}
            placeholder="Search here..."
          />
          <button className ='search' type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
