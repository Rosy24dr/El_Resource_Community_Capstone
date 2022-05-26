
import React, { useEffect, useState } from "react";


const FavoriteEvents = (props) => {
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    console.log('rerender')
    setLoading(false)
  }, [props])

  return (
<ul>
      {console.log(props)}
      {props.favoriteEvent.map((f) => (
        <li key={f.id}>
          <div>{f.start_date}</div>
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

export default FavoriteEvents;
