import React, { useState, useEffect } from "react";
import ReplyForm from "../ReplyForm/ReplyForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Popup from "../Popup/Popup";
import "./Reply.css";
import { Accordion } from "react-bootstrap";

const Reply = (props) => {
  const [user, token] = useAuth();
  const [replies, setReplies] = useState([]);
  const [contentToUpdate, setContentToUpdate] = useState("");
  const [dateToUpdate, setDateToupdate] = useState("");
  const [idToUpdate, setIdToupdate] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);

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
      let response = await axios.post(
        "http://127.0.0.1:8000/api/forumreply/create/",
        newReply,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        alert("Reply was added successfully!")
      }
      getReplies();
    } catch (error) {
      console.log(newReply);
      console.log(error.message);
    }
  };

  const updateReply = async (updatedReply) => {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/forumreply/edit/${idToUpdate}/`,
        updatedReply,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        alert("Reply was updated successfully!")
      }
      getReplies();
    } catch (error) {
      console.log(error.message);
    }
  };

  async function deleteReply(reply) {
    try {
      let result = await axios.delete(
        `http://127.0.0.1:8000/api/forumreply/delete/${reply}/`,
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
  }

  const setReplyToUpdate = (reply) => {
    setButtonPopup(true);
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
      deleteReply(reply);
    }
  }

  return (
    <div>
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
          <button className="reply-btn">Edit Reply</button>
        </form>
      </Popup>
      {replies.map((r) => {
        return (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>Reply</div>
              <div key={r.id}>
                <Accordion.Header>
                  {" "}
                  <div>{r.user.username}</div>{" "}
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <div>{r.content}</div>
                  <div>{r.date}</div>
                  <hr />
                  <button
                    onClick={() => setReplyToUpdate(r)}
                    className="reply-btn"
                  >
                    Edit Reply
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="reply-btn"
                  >
                    Delete Reply
                  </button>
                </Accordion.Body>
              </div>
            </Accordion.Item>
          </Accordion>
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
