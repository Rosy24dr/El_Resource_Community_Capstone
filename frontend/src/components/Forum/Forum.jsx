import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Comment from "../Comment/Comment";
import PostForm from "../PostForm/PostForm"; 



const Forum = (props) => {
  const [user, token] = useAuth();
  const [post, setPost] = useState([]);

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

  return (
    <div>
      <div>
        <div>
          <div>
            {post &&
              post.map((p) => (
                <div key={p.id}>
                  <div >{p.topic}</div>
                  <div>{p.description}</div>
                  <div>{p.date}</div>
                  <Comment
                    user={user}
                    forumpostId={p.id}
                  />
                </div>
              ))}
              <PostForm addpost={addPost} user={user} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Forum;
