import React, { useState, useEffect } from "react";
import ReplyForm from "../ReplyForm/ReplyForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Reply = (props) => {
  const [user, token] = useAuth();
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    getReplies();
  }, []);

  const getReplies = async () => {
    try {
      let result = await axios.get(
        `http://127.0.0.1:8000/api/forumreply/${props.forumcommentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setReplies(result.data);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(replies);

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
  return (
    <div>
      {replies &&
        replies.map((r) => {
          <div>
            <div key={r.id}>{r.content}</div>
            <div>{r.date}</div>
            <ReplyForm
              addReply={addReply}
              user={user}
              forumcommentId={props.forumcommentId}
            />
          </div>
        })}
    </div>
  );
};

export default Reply;
