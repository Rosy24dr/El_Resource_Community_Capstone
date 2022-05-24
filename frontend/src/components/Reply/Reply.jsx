import React, { useState, useEffect } from "react";
import ReplyForm from "../ReplyForm/ReplyForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Reply = (props) => {
  const [user, token] = useAuth();
  const [replies, setReplies] = useState([]);
  const [updateReplies, setUpdateReplies] = useState([]);
  const [content, setContent] = useState(" ");
  const [date, setDate] = useState("");

  useEffect(() => {
    getReplies();
  }, []);

function handleUpdate(event) {
    event.preventDefault();
    let reply = {
      user: props.user.id,
      forumcomment_id: props.forumcommentId,
      content: content,
      date: date,
    };
    updateReply(reply);
  }
  const getReplies = async () => {
    try {
      let result = await axios.get(
        `http://127.0.0.1:8000/api/forumreply/${props.forumcommentId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setReplies(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addReply = async (newReply) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/forumreply/create/",
        newReply,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getReplies();
    } catch (error) {
      console.log(newReply);
      console.log(error.message);
    }
  };

  const updateReply = async () => {
    try {
      let result = await axios.put(
        `http://127.0.0.1:8000/api/forumreply/${props.forumcommentId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUpdateReplies(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  

  return (
    <div>
      {replies.map((r) => {
        return (
          <div>
            <div key={r.id}>{r.content}</div>
            <div>{r.date}</div>
          </div>
        );
      })}

      <ReplyForm
        addReply={addReply}
        user={user}
        forum
        commentId={props.forumcommentId}
      />
      <button onClick={handleUpdate}>Update Reply</button>
    </div>
  );
};

export default Reply;
