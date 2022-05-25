import React, { useState, useEffect } from "react";


const favoriteList = (props) => {
 

  return (
    <ul>
      {props.favoriteEvent.map((f) => (
        <li key={f.id}>
          <div key={f.id}>{f.start_date}</div>
          <div>{f.end_date}</div>
          <div>{f.title}</div>
          <div>{f.content}</div>
          <div>{f.category}</div>
          <div>{f.address}</div>
          <div>{f.zip_code}</div>
        </li>
      ))}
    </ul>
  );
};

export default favoriteList;
