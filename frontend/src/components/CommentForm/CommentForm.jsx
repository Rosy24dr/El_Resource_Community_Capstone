import React, { useState } from "react";
import Popup from "../Popup/Popup";
import './CommentForm.css'

const CommentForm = (props) => {
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let newComment = {
      user: props.user.id,
      forumpost_id: props.forumpostId,
      content: content,
      date: date,
    };
    props.addComment(newComment);
    setContent(" ");
  }

  return (
    <div>
      <main>
        <button onClick={() => setButtonPopup(true)} className="commentForm-btn">Add Comment</button>
      </main>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={content}
            placeholder="Enter text"
            onChange={(event) => setContent(event.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <button className="commentForm-btn">Add comment</button>
        </form>
      </Popup>
    </div>
  );
};

export default CommentForm;
