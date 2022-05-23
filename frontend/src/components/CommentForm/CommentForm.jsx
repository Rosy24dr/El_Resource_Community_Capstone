import React, { useState } from "react";

const CommentForm = (props) => {
  const [content, setContent] = useState(' ');
  const [date, setDate] = useState('')

  function handlesubmit(event) {
    event.preventDefault();
    let newComment = {
      user: props.user.id,
      forumpost_id: props.forumpostId,
      content: content,
      date: date,
    };
    props.addComment(newComment);
    setContent(' ');
  }
  return (
    <form onSubmit={handlesubmit}>
     
      <input
        type="text"
        value={content}
        placeholder="Enter text"
        onChange={(event) => setContent(event.target.value)}
      />
      <input
      type="date"
      value={date}
      placeholder="Enter date"
      onChange={(event) => setDate(event.target.value)}
    />
      <button>Add Comment</button>
    </form>
  );
};

export default CommentForm;