import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillReplyAllFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import "./forum.scss";
const Forum = () => {
  const [msgs, setMsgs] = useState();
  const [reply, setReply] = useState();
  const [forumId, setForumId] = useState();
  const [index, setIndex] = useState();
  const [active, setActive] = useState({
    status: false,
    role: "",
    id: "",
  });
  const [activeParams, setActiveParams] = useState(false);
  const getMsgs = async () => {
    return await axios.get("http://127.0.0.1:5000/forum");
  };

  console.log(active.id);
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
                        setActive({ status: true, role: "add" });
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
                  <div>
                    <span>
                      <BsThreeDots
                        size={16}
                        onClick={() => {
                          setActiveParams(!activeParams)
                          setIndex(idx)
                        } }
                      />
                    </span>
                    {activeParams && idx === index && (
                      <div className="params">
                        <span
                          onClick={() =>
                            setActive({
                              role: "update",
                              status: true,
                              id: item.reply._id,
                            })
                          }
                        >
                          update
                        </span>
                        <span
                          onClick={async () => {
                            await axios
                              .delete(
                                `http://127.0.0.1:5000/forum/del_reply/${item.reply._id}`,
                                {
                                  contenu: reply,
                                  forumId: forumId,
                                }
                              )
                              .then((res) => window.location.reload());
                          }}
                        >
                          delete
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {active.status && (
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
                if (active.role === "add") {
                  await axios
                    .post("http://127.0.0.1:5000/forum/add_reply", {
                      contenu: reply,
                      forumId: forumId,
                    })
                    .then((res) => window.location.reload());
                } else if (active.role === "update") {
                  await axios
                    .put(
                      `http://127.0.0.1:5000/forum/update_reply/${active.id}`,
                      {
                        contenu: reply,
                      } 
                    )
                    .then((res) => window.location.reload());
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Forum;
