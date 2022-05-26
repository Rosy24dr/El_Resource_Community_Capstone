import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Comment from "../Comment/Comment";
import PostForm from "../PostForm/PostForm";
import Popup from "../Popup/Popup";

const Forum = (props) => {
  const [user, token] = useAuth();
  const [post, setPost] = useState([]);
  const [topicToUpdate, setTopicToUpdate] = useState("");
  const [dateToUpdate, setDateToUpdate] = useState("");
  const [idToUpdate, setIdToUpdate] = useState();
  const [descriptionToUpdate, setDescriptionToUpdate] = useState();
  const [categoryToUpdate, setCategoryToUpdate] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/forumpost/");
      setPost(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addPost = async (newPost) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/forumpost/create/", newPost, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      getPosts();
    } catch (error) {
      console.log(newPost);
      console.log(error.message);
    }
  };

  async function deletePost(post) {
    try {
      let result = await axios.delete(
        `http://127.0.0.1:8000/api/forumpost/delete/${post}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getPosts();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updatePost = async (updatedPost) => {
    try {
      let result = await axios.put(
        `http://127.0.0.1:8000/api/forumpost/${idToUpdate}/`,
        updatedPost,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getPosts();
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleDelete(post) {
    let response = prompt(
      "Are you sure you would like to delete this reply? "
    ).toLowerCase();
    if (response === "yes") {
      deletePost(post);
    }
  }


  const setPostToUpdate = (post) => {
    setButtonPopup(true);
    setIdToUpdate(post.id);
    setDateToUpdate(post.date);
    setTopicToUpdate(post.topic);
    setDescriptionToUpdate(post.description);
    setCategoryToUpdate(post.category);
  };


  
  

 function handleUpdate(event) {
    event.preventDefault();
    let post = {
      user: user.id,
      topic: topicToUpdate,
      description: descriptionToUpdate,
      category: categoryToUpdate,
      date: dateToUpdate,
    };
    console.log(post);
    updatePost(post);
  }

  return (
    <div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleUpdate}>
          <label for="topic">Topic</label>
          <input
            type="text"
            value={topicToUpdate}
            placeholder="Enter text"
            onChange={(event) => setTopicToUpdate(event.target.value)}
          />
          <label for="description">Description</label>
          <input
            type="text"
            value={descriptionToUpdate}
            placeholder="Enter text"
            onChange={(event) => setDescriptionToUpdate(event.target.value)}
          />
          <label for="category">Category</label>
          <input
            type="text"
            value={categoryToUpdate}
            placeholder="Enter text"
            onChange={(event) => setCategoryToUpdate(event.target.value)}
          />
          <input
            type="date"
            value={dateToUpdate}
            onChange={(event) => setDateToUpdate(event.target.value)}
          />
          <button>Edit Post</button>
        </form>
      </Popup>
      {post.map((p) => (
          <div key={p.id}>
            <div>{p.topic}</div>
            <div>{p.description}</div>
            <div>{p.category}</div>
            <div>{p.date}</div>
            <button onClick={() => setPostToUpdate(p)}>Edit Post</button>
            <button onClick={() => handleDelete(p.id)}>Delete Post</button>
            <Comment user={user} forumpostId={p.id} />
          </div>
        ))}
      <PostForm addpost={addPost} user={user} />
    </div>
  );
};

export default Forum;
