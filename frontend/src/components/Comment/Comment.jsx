import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";

const Comment = () => {
    const [user,token] = useAuth();
    const [comment,setComment] = useState([]);

    useEffect(() => {
        fetchComments();
       }, []);
     
    const fetchComments = async () => {
       try{
        let result = await axios.get("http://127.0.0.1:8000/api/forumcomments/", {
         headers: {
           Authorization: "Bearer " + token,
         },
       });
       setComment(result.data);
        }catch (error) {
            console.log(error.message);
        }
     };
     console.log(comment);

     return ( 
        <div>
             {comment && comment.map((c) => (
        < div >
          <div >
            <div>{c.content}</div>
            <div>{c.date}</div>
          </div>
        </div>
             ))}
      </div>
     );
}
 
export default Comment;