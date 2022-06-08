import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Comment from "../Comment/Comment";
import PostForm from "../PostForm/PostForm";
import Popup from "../Popup/Popup";
import "./Forum.css";
import { Accordion } from "react-bootstrap";

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
      let response = await axios.post(
        "http://127.0.0.1:8000/api/forumpost/create/",
        newPost,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        alert("Post was added successfully!");
      }
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
  }

  const updatePost = async (updatedPost) => {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/forumpost/${idToUpdate}/`,
        updatedPost,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        alert("Post was updated successfully!");
      }
      getPosts();
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleDelete(post) {
    let response = prompt(
      "Are you sure you would like to delete this post? "
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
      <PostForm addpost={addPost} user={user} />
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
          <button className="forum-btn">Edit Post</button>
        </form>
      </Popup>
      {post.map((p) => (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <div key={p.id} className="forumMapping">
              <Accordion.Header>
                {" "}
                <div>{p.user.username}</div>
                <div>{p.topic}</div>
              </Accordion.Header>
              <Accordion.Body>
                {" "}
                <div>{p.date}</div> <div>{p.description}</div>
                <div>Category: {p.category}</div>
                <button
                  onClick={() => setPostToUpdate(p)}
                  className="forum-btn"
                >
                  Edit Post
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="forum-btn"
                >
                  Delete Post
                </button>{" "}
              </Accordion.Body>
              <hr />
              <Accordion.Body>
                <Comment user={user} forumpostId={p.id} />
              </Accordion.Body>
            </div>{" "}
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};

export default Forum;
