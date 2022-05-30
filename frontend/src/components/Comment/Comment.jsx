import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CommentForm from "../CommentForm/CommentForm";
import Reply from "../Reply/Reply"
import Popup from "../Popup/Popup";
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
  const updateComment = async (updatedComment) => {
    try {
      let result = await axios.put(
        `http://127.0.0.1:8000/api/forumcomments/${idToUpdate}/`,
        updatedComment,
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
          <button>Edit Comment</button>
        </form>
      </Popup>
      {comments.map((c) => {
          return (
            <div>
              <div>{c.user.username}</div>
              <div key={c.id}>{c.content}</div>
              <div>{c.date}</div>
              <button onClick={() => setCommentToUpdate(c)}>Edit Comment</button>
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



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";
// import CommentForm from "../CommentForm/CommentForm";
// import Reply from "../Reply/Reply"
// import Popup from "../Popup/Popup";

// const Comment = (props) => {
//   const [user, token] = useAuth();
//   const [comments, setComments] = useState([]);
//   const [contentToUpdate, setContentToUpdate] = useState("");
//   const [dateToUpdate, setDateToupdate] = useState("");
//   const [idToUpdate, setIdToupdate] = useState();
//   const [buttonPopup, setButtonPopup] = useState(false);

//   useEffect(() => {
//     getComments();
//   }, []);

//   const getComments = async () => {
//     try {
//       let result = await axios.get(`http://127.0.0.1:8000/api/forumcomments/${props.forumpostId}/`, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       setComments(result.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const addComment = async (newComment) => {
//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/api/forumcomments/create/",
//         newComment,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       getComments();
//     } catch (error) {
//       console.log(newComment);
//       console.log(error.message);
//     }
//   };

//   async function deleteComment(comment) {
//     try {
//       let result = await axios.delete(
//         `http://127.0.0.1:8000/api/forumcomments/delete/${comment}/`,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       getComments();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const updateComment = async (updatedComment) => {
//     try {
//       let result = await axios.put(
//         `http://127.0.0.1:8000/api/forumcomments/${idToUpdate}/`,
//         updatedComment,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       getComments();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   function handleDelete(comment) {
//     let response = prompt(
//       "Are you sure you would like to delete this comment? "
//     ).toLowerCase();
//     if (response === "yes") {
//       deleteComment(comment);
//     }
//   }

//   const setCommentToUpdate = (comment) => {
//     setButtonPopup(true);
//     setIdToupdate(comment.id);
//     setContentToUpdate(comment.content);
//     setDateToupdate(comment.date);
//   };

//   function handleUpdate(event) {
//     event.preventDefault();
//     let comment = {
//       user: user.id,
//       forumpost_id: props.forumpostId,
//       content: contentToUpdate,
//       date: dateToUpdate,
//     };
//     console.log(comment);
//     updateComment(comment);
//   }

//   return (
//     <div>
//       <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
//         <form onSubmit={handleUpdate}>
//           <input
//             type="text"
//             value={contentToUpdate}
//             placeholder="Enter text"
//             onChange={(event) => setContentToUpdate(event.target.value)}
//           />
//           <input
//             type="date"
//             value={dateToUpdate}
//             onChange={(event) => setDateToupdate(event.target.value)}
//           />
//           <button>Edit Comment</button>
//         </form>
//       </Popup>
//       {comments.map((c) => {
//           return (
//             <div>
//               <div>{c.user.username}</div>
//               <div key={c.id}>{c.content}</div>
//               <div>{c.date}</div>
//               <button onClick={() => setCommentToUpdate(c)}>Edit Comment</button>
//               <button onClick={() => handleDelete(c.id)}>Delete Comment</button>
//               <Reply forumcommentId={c.id} comments={comments} user={props.user}/>
//             </div> 
//           );
//         }
//       )}
//       <CommentForm addComment= {addComment} user={user} forumpostId={props.forumpostId} />
//     </div>
    
//   );
// };

// export default Comment;