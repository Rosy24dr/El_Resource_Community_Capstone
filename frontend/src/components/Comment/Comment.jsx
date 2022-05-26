import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CommentForm from "../CommentForm/CommentForm";
import Reply from "../Reply/Reply"

const Comment = (props) => {
  const [user, token] = useAuth();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      let result = await axios.get(`http://127.0.0.1:8000/api/forumcomments/${props.forumpostId}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setComments(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  async function deleteComment(comment) {
    try {
      let result = await axios.delete(
        `http://127.0.0.1:8000/api/forumcomments/delete/${comment}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getComments();
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleDelete(comment) {
    let response = prompt(
      "Are you sure you would like to delete this comment? "
    ).toLowerCase();
    if (response === "yes") {
      deleteComment(comment);
    }
  }

  return (
    <div>
      {comments.map((c) => {
          return (
            <div>
              <div key={c.id}>{c.content}</div>
              <div>{c.date}</div>
              <button onClick={() => handleDelete(c.id)}>Delete Comment</button>
              <Reply forumcommentId={c.id} comments={comments} user={props.user}/>
            </div> 
          );
        }
      )}
      <CommentForm addComment= {addComment} user={user} forumpostId={props.forumpostId} />
    </div>
    
  );
};

export default Comment;