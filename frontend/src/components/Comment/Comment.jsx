import React from "react";

const Comment = ({comment}, {forumId}) => {
  return (
    <div>
      {comment.map((c) => {
        if (c.forumpost_id === forumId) {
         
          return (
            <div>
              <div key={c.id}>{c.content}</div>
              <div>{c.date}</div>
            </div> 
          );
        }
      })}
    </div>
  );
};

export default Comment;