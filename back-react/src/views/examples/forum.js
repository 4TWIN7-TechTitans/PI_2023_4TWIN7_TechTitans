import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillReplyAllFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import "./forum.scss";
const Forum = () => {
  const [msgs, setMsgs] = useState();
  const [reply, setReply] = useState();
  const [forumId, setForumId] = useState();
  const [active, setActive] = useState(false);
  const getMsgs = async () => {
    return await axios.get("http://127.0.0.1:5000/forum");
  };
  
  console.log(msgs?.msgReply);
  console.log(reply)
  useEffect(() => {
    getMsgs().then((res) => setMsgs(res.data));
    return () => {
      setMsgs();
    };
  }, []);

  return (
    <div
      style={{
        paddingTop: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          boxShadow: "1px 1px 5px grey",
          borderRadius: 13,
          width: 500,
          height: "75vh",
          position: "relative",
        }}
      >
        <div>
          {msgs?.msgReply?.map((item, idx) => (
            <div className="msg-container" key={idx}>
              <div className="msg">
               
                <span>{item.msg.contenu}</span>

                <div>
                  {!item?.reply && (
                    <BsFillReplyAllFill
                      onClick={() => {
                        setActive(true)
                        setForumId(item?.msg._id);
                      }}
                      size={22}
                    />
                  )}

                  <span>{item.msg.clientId.first_name}</span>
                </div>
              </div>
              {item.reply ? (
                <div className="reply">
                 
                
                  <span>{item.reply.contenu}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {active && (
          <>
            <input
              className="reply-input"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="add a reply"
            />
            <AiOutlineSend
              size={20}
              color={"black"}
              style={{
                position: "absolute",
                right: "15px",
                bottom: "6px",
                zIndex: 2000,
                cursor: "pointer",
              }}
              onClick={async () => {
                await axios.post('http://127.0.0.1:5000/forum/add_reply',{contenu:reply,forumId:forumId,})
                .then(res=> window.location.reload()
                  
                )
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Forum;
