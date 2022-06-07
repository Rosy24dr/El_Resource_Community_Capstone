import React, {useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CommentForm from "../CommentForm/CommentForm";
import Reply from "../Reply/Reply";
import Popup from "../Popup/Popup";
import "./Comment.css";
import { Accordion } from "react-bootstrap";

const Comment = (props) => {
  const [user, token] = useAuth();
  const [comments, setComments] = useState([]);
  const [contentToUpdate, setContentToUpdate] = useState("");
  const [dateToUpdate, setDateToupdate] = useState("");
  const [idToUpdate, setIdToupdate] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);
  
  useEffect(() => {
    getComments();
  }, []);
  const getComments = async () => {
    try {
      let result = await axios.get(
        `http://127.0.0.1:8000/api/forumcomments/${props.forumpostId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setComments(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addComment = async (newComment) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/forumcomments/create/",
        newComment,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        alert("Comment was added successfully!")
      }
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
  }
  const updateComment = async (updatedComment) => {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/forumcomments/edit/${idToUpdate}/`,
        updatedComment,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        alert("Comment was updated successfully!")
      }
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
  const setCommentToUpdate = (comment) => {
    setButtonPopup(true);
    setIdToupdate(comment.id);
    setContentToUpdate(comment.content);
    setDateToupdate(comment.date);
  };
  function handleUpdate(event) {
    event.preventDefault();
    let comment = {
      user: user.id,
      forumpost_id: props.forumpostId,
      content: contentToUpdate,
      date: dateToUpdate,
    };
    console.log(comment);
    updateComment(comment);
  }
  return (
    <div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={contentToUpdate}
            placeholder="Enter text"
            onChange={(event) => setContentToUpdate(event.target.value)}
          />
          <input
            type="date"
            value={dateToUpdate}
            onChange={(event) => setDateToupdate(event.target.value)}
          />
          <button className="comment-btn">Edit Comment</button>
        </form>
      </Popup>
      {comments.map((c) => {
        return (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>Comment</div>
              <div>
                <Accordion.Header>
                  {" "}
                  <div>{c.user.username}</div>
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <div key={c.id}>{c.content}</div>
                  <div>{c.date}</div>
                  <button
                    onClick={() => setCommentToUpdate(c)}
                    className="comment-btn"
                  >
                    Edit Comment
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="comment-btn"
                  >
                    Delete Comment
                  </button>
                </Accordion.Body>
                <hr />
                <Accordion.Body>
                  {" "}
                  <Reply
                    forumcommentId={c.id}
                    comments={comments}
                    user={props.user}
                  />
                </Accordion.Body>
              </div>{" "}
            </Accordion.Item>
          </Accordion>
        );
      })}
      <CommentForm
        addComment={addComment}
        user={user}
        forumpostId={props.forumpostId}
      />
    </div>
  );
};
export default Comment;
