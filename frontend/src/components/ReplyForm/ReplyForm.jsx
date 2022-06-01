import React, { useState } from "react";
import Popup from "../Popup/Popup";
import "./ReplyForm.css"

const PostForm = (props) => {
  const [content, setContent] = useState(" ");
  const [date, setDate] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);

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
  }

  return (
    <div>
      <main>
        <button onClick={() => setButtonPopup(true)} className="replyForm-btn">
          Add Reply
        </button>
      </main>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
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
          <button className="replyForm-btn">Add Reply</button>
        </form>
      </Popup>
    </div>
  );
};

export default PostForm;
