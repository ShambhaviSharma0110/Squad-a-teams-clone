import { useState } from "react";
import "./Chat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUserFriends,
  faCommentAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../utils/helpers";

//this is for the chatting functionality and tab on the right that opens on toggling

const Chat = ({ setIsChat, sendMsg, chatList }) => {
  const [msg, setMsg] = useState("");

  const handleChangeInText = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMsg(msg);
      setMsg("");
    }
  };

  const handleSendingText = () => {
    sendMsg(msg);
    setMsg("");
  };

  return (
    <div className="text-wrap">
      <div className="text-head">
        <h3>Meet Info</h3>
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => {
            setIsChat(false);
          }}
        />
      </div>

      <div className="text-head-tab">
        <div className="tab">
          <FontAwesomeIcon className="icon" icon={faUserFriends} />
          <p>Participants(1)</p>
        </div>
        <div className="tab active">
          <FontAwesomeIcon className="icon" icon={faCommentAlt} />
          <p>Chat</p>
        </div>
      </div>

      <div className="text-section">
        {chatList.map((item) => (
          <div key={item.time} className="text-block">
            <div className="sender">
              {item.user} <small>{formatDate(item.time)}</small>
            </div>
            <p className="msg">{item.msg}</p>
          </div>
        ))}
      </div>

      <div className="send-text-section">
        <input
          placeholder="Ping awayy"
          value={msg}
          onChange={(e) => handleChangeInText(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <FontAwesomeIcon
          className="icon"
          icon={faPaperPlane}
          onClick={handleSendingText}
        />
      </div>
    </div>
  );
};

export default Chat;
