import React, { useState, useEffect } from "react";


const GetEvent = (props) => {
 

  return (
    <ul>
      {favoriteEvent.map((f) => (
        <li key={f.id}>
          <div key={e.id}>{e.start_date}</div>
          <div>{e.end_date}</div>
          <div>{e.title}</div>
          <div>{e.content}</div>
          <div>{e.category}</div>
          <div>{e.address}</div>
          <div>{e.zip_code}</div>
        </li>
      ))}
    </ul>
  );
};

export default GetEvent;
