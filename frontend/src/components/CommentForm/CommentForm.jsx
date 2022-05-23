import React, { useState } from "react";

const CommentForm = (props) => {
  const [content, setContent] = useState(' ');
  const [date] = useState(new Date().toLocaleDateString());

  function handlesubmit(event) {
    event.preventDefault();
    let newComment = {
      user: props.user.id,
      forumpost: props.forumpostId,
      content: content,
      date: date
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
      <button className="search-button">Add Comment</button>{" "}
    </form>
  );
};

export default CommentForm;