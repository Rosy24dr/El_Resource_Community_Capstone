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
  console.log(comments);

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

  return (
    <div>
      {comments.map((c) => {
          return (
            <div>
              <div key={c.id}>{c.content}</div>
              <div>{c.date}</div>
              <Reply forumcommentId={c.id}/>
            </div> 
          );
        }
      )}
      <CommentForm addComment= {addComment} user={props.user} forumpostId={props.forumpostId} />
    </div>
    
  );
};

export default Comment;