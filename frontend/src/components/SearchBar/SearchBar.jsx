import React, { useState } from "react";
import "./SearchBar.css"
import { BiSearchAlt } from 'react-icons/bi'




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
      <form onSubmit={handleSearch}>
        <div className="searchBar">
          <input className="searchBarInput"
            type="text"
            value={eventSearch}
            onChange={(e) => setEventSearch(e.target.value)}
            placeholder="Search Resources..."
          />
          <button className ='searchBarButton' type="submit"><BiSearchAlt /></button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
