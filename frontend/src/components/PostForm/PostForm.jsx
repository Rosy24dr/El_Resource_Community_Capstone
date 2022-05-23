import React, { useState } from "react";

const PostForm = (props) => {
  const [topic, setTopic] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [date, setDate] = useState("");

  function handlesubmit(event) {
    event.preventDefault();
    let newPost = {
      user: props.user.id,
      topic: topic,
      description: description,
      category: category,
      date: date,
    };
    props.addpost(newPost);
    setTopic(" ");
    setDescription(" ");
    setCategory(" ");
    setDate(" ");
  }
  return (
    <form onSubmit={handlesubmit}>
      <div>
        <label for="topic">Topic</label>
        <input
          type="text"
          value={topic}
          placeholder="Enter text"
          onChange={(event) => setTopic(event.target.value)}
        />
      </div>
      <div>
        <label for="topic">Description</label>
        <input
          type="text"
          value={description}
          placeholder="Enter text"
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div>
        <label for="category">Category</label>
        <input
          type="text"
          value={category}
          placeholder="Enter text"
          onChange={(event) => setCategory(event.target.value)}
        />
        <input
          type="date"
          value={date}
          placeholder="Enter date"
          onChange={(event) => setDate(event.target.value)}
        />
        <button className="search-button">Add Post</button>{" "}
      </div>
    </form>
  );
};

export default PostForm;
