import React, { useState, useContext, useEffect } from "react";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import "./trending.css"
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import axios from "axios";
import { AuthContext } from "../../contexts/context";
import { profimgContext } from "../../App";


function Trending({ t }) {
  // console.log("Tea", t)
  const formatter = buildFormatter(frenchStrings);
  const [nameUser, setNameUser] = useState("");      
  const { token, userId } = useContext(AuthContext);   
  const { profimg } = useContext(profimgContext);

  const getNameUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNameUser(res.data.posts.firstName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNameUser();
  }, []);

  const choose = (body) => {
    const arraybody = body.split(" ");
     
    return (
      <span>
        {arraybody.map((x) => {
        
          if (x.startsWith("http")) {
            return <img className="postImg" src={x} alt="" />;
          }
          return x + " ";
        })}
      </span>
    );
  };

  return (
    <div class="friends">
<div class="friend" >
  
    <div class="info">
      <div>
        <img src={t.post.user.avatar} alt=""  class="profile" />
      </div>
        <div class="handle">
            <h4>{t.post.user.firstName}</h4>
        </div>
    </div>
            <p class="text" >
            {/* {choose(t.post.body)} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nemo et sequi placeat cum accusantium dolor natus molestiae officiis sint ducimus expedita quaerat corrupti aspernatur repudiandae harum totam, deserunt ea.               
            </p>
            <div style={{textAlign:"right"}}> <ThumbUpAltIcon  className="iconLikeTrind"/> {t.post.likesCounter}</div>
</div>



</div>
  );
}

export default Trending;

// <div className="postdevid">
// <div className="postTop">
//   <div className="postTopLeft">   {/* */}
//   {/* res.data.trends.user.avatar */}
//     {/* <img
//       className="postProfileImg"
//       src={t.post.user.avatar}
//       alt=""
//     /> */}
//     <span className="postUsername">{t.post.user.firstName}</span>
//     <span className="postDate">
//       <TimeAgo date={t.post.date} formatter={formatter} />
//     {/* {console.log("date",t.post.date)} */}
//     </span>
//   </div>
// </div>
// <div className="postCenter1">
//   <div>{choose(t.post.body)}</div>
//   <div> <ThumbUpAltIcon className="iconLikeTrind"/> {t.post.likesCounter}</div>
// </div>
//   <hr style={{ fontSize: "10px", color: "gray", marginTop: "10px" , width: "350px" }} />
// </div>