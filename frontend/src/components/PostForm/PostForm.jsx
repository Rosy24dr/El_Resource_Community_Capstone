import React, { useState } from "react";

const PostForm = (props) => {
  const [topic, setTopic] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [date] = useState(new Date().toLocaleDateString());

  function handlesubmit(event) {
    event.preventDefault();
    let newPost = {
      user: props.user.id,
      topic: topic,
      description: description,
      category: category,
      date: date,
    };
    console.log(newPost);
    props.addpost(newPost);
  }
  return(
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
        <button className="search-button">Add Post</button>{" "}
      </div>
    </form>
  );
};

export default PostForm;
