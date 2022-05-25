import React, { useState, useEffect } from "react";
import ReplyForm from "../ReplyForm/ReplyForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Popup from "../Popup/Popup";

const Reply = (props) => {
  const [user, token] = useAuth();
  const [replies, setReplies] = useState([]);
  const [contentToUpdate, setContentToUpdate] = useState("");
  const [dateToUpdate, setDateToupdate] = useState("");
  const [idToUpdate, setIdToupdate] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [idToDelete,setIdToDelete] = useState()

  useEffect(() => {
    getReplies();
  }, []);

 
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

  const updateReply = async (updatedReply) => {
    try {
      let result = await axios.put(
        `http://127.0.0.1:8000/api/forumreply/${idToUpdate}/`,
        updatedReply,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getReplies();
    } catch (error) {
      console.log(error.message);
    }
  };

  async function deleteReply() {
    try {
      let result = await axios.put(
        `http://127.0.0.1:8000/api/forumreply/${idToDelete}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getReplies();
    } catch (error) {
      console.log(error.message);
    }
  };
  const setReplyToDelete = (reply)=> {
    setIdToDelete(reply.id);
  }

  const setReplyToUpdate = (reply) => {
    setIdToupdate(reply.id);
    setContentToUpdate(reply.content);
    setDateToupdate(reply.date);
  };

  

 function handleUpdate(event) {
    event.preventDefault();
    let reply = {
      user: props.user.id,
      forumcomment_id: props.forumcommentId,
      content: contentToUpdate,
      date: dateToUpdate,
    };
    console.log(reply);
    updateReply(reply);
  }


  function handleDelete(reply) {
    let response = prompt(
      "Are you sure you would like to delete this reply? "
    ).toLowerCase();
    if (response === "yes") {
      deleteReply(reply.id);
    }
  }

  
  return (
    <div>
      <main>
        <button onClick={() => setButtonPopup(true)}>Edit Reply</button>
      </main>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleUpdate}>
          <div>
            <label for="content"></label>
            <input
              type="text"
              defaultValue={contentToUpdate}
              placeholder="Enter text"
              onChange={(event) => setContentToUpdate(event.target.value)}
            />
          </div>
          <div>
            <label for="Date">Date</label>
            <input
              type="Date"
              defaultValue={dateToUpdate}
              placeholder="Enter date"
              onChange={(event) => setDateToupdate(event.target.value)}
            />
          </div>
          <button className="search-button">Edit Reply</button>
        </form>
      </Popup>
      {replies.map((r) => {
        return (
          <div>
            <div key={r.id}>{r.content}</div>
            <div>{r.date}</div>
            <button onClick={() => setReplyToUpdate(r)}>Edit Reply</button>
            <form onSubmit={handleDelete}>
            <button onClick={() => setReplyToDelete(r)}>Delete Reply</button>
            </form>
          </div>
        );
      })}

      <ReplyForm
        addReply={addReply}
        user={user}
        forumcommentId={props.forumcommentId}
      />
    </div>
  );
};

export default Reply;
