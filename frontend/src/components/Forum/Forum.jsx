import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

const Forum = ({forumId}, {forumpostId}) => {
  const [user, token] = useAuth();
  const [comment, setComment] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPosts();
    getComments();
  }, []);

  const getComments = async () => {
    try {
      let result = await axios.get(`http://127.0.0.1:8000/api/forumcomments/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setComment(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(comment);

  const addComment = async (newComment) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/forumcomments/create/",
        newComment,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getComments();
    } catch (error) {
      console.log(newComment);
      console.log(error.message);
    }
  };

  const getPosts = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/forumpost/");
      setPost(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addPost = async (addNew) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/forumpost/create/", addNew, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      getPosts();
    } catch (error) {
      console.log(addNew);
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
                <div>
                  <div>{p.topic}</div>
                  <div>{p.description}</div>
                  <div>{p.date}</div>
                </div>
              ))}
          </div>
          <Comment
            user={user}
            addpost={addPost}
            getpost={getPosts}
            comment={comment}
            forumId={forumId}
            forumpostId={forumpostId}
          />
          <CommentForm addCommnet={addComment} forumId={forumId} user={user} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Forum;
