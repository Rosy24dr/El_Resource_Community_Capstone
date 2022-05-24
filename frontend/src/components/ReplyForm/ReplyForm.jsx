
import React, { useState } from "react";

const PostForm = (props) => {
  const [content, setContent] = useState(" ");
  const [date, setDate] = useState("");


  function handlesubmit(event) {
    event.preventDefault();
    let newReply = {
      user: props.user.id,
      forumcomment_id: props.forumcommentId,
      content: content,
      date: date,
    };
    props.addReply(newReply);
    setContent(" ");
    setDate(" ");
  }
  return (
    <form onSubmit={handlesubmit}>
      <div>
        <label for="content"></label>
        <input
          type="text"
          value={content}
          placeholder="Enter text"
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div>
        <label for="Date">Date</label>
        <input
          type="Date"
          value={date}
          placeholder="Enter date"
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

        <button className="search-button">Add Reply</button>{" "}
    </form>
  );
};

export default PostForm;
