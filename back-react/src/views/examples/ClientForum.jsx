import React from "react";
import "./clientForum.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
const ClientForum = () => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  console.log(data);
  // cookie
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const userid = getCookie("userid").substring(
    3,
    getCookie("userid").length - 1
  );

  // get messages by clientId
  const getMsg = async () => {
    console.log('gjhgj',userid)
    return await axios.get(`http://localhost:5000/forum/${userid}`);
  };
  useEffect(() => {
    setUserId(userid);
    getMsg()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="clientForum_container">
      <div>
        <h1>Ask us !</h1>
        <div className="clientForum-msg-container">
          {data?.msgReply
            ? data.msgReply?.map((item, idx) => (
                <>
                  <div key={idx} className="client-forum">
                    <div className="clientForum-msg">
                      <div>
                        <p>{item?.msg?.contenu}</p>
                        <FaTrashAlt
                          onClick={async () => {
                            await axios
                              .delete(
                                `http://localhost:5000/forum/del_msg/${item?.msg?._id}`
                              )
                              .then((res) => window.location.reload());
                          }}
                        />
                      </div>
                    </div>
                    <div className="clientForum-reply">
                      {item?.reply && (
                        <p className="box-span">{item?.reply?.contenu}</p>
                      )}
                    </div>
                  </div>
                </>
              ))
            : null}
        </div>
        <div className="clientForum-input-container">
          <input
            placeholder="add ur message here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            onClick={async () => {
              await axios
                .post("http://localhost:5000/forum/add_msg", {
                  clientId: userId,
                  contenu: msg,
                })
                .then((res) => window.location.reload());
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientForum;
