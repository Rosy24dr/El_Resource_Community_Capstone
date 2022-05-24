import React, { useState } from "react";
import Popup from "../Popup/Popup";

const PostForm = (props) => {
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);

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
    setTopic("");
    setDescription("");
    setCategory("");
  }
  return (
    <div>
      <main>
        <button onClick={() => setButtonPopup(true)}>Add Post</button>
      </main>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handlesubmit}>
          <label for="topic">Topic</label>
          <input
            type="text"
            value={topic}
            placeholder="Enter text"
            onChange={(event) => setTopic(event.target.value)}
          />
          <label for="description">Description</label>
          <input
            type="text"
            value={description}
            placeholder="Enter text"
            onChange={(event) => setDescription(event.target.value)}
          />
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
            onChange={(event) => setDate(event.target.value)}
          />
          <button type="submit">Add Post</button>
        </form>
      </Popup>
    </div>
  );
};

export default PostForm;
