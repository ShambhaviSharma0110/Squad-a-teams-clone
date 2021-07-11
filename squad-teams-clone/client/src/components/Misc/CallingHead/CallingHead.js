import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCommentAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./CallingHead.scss";
import { formatDate } from "../../../utils/helpers";

const CallPageHeader = ({
  isChat,
  setIsChat,
  chatAlert,
  setChatAlert,
}) => {
  let interval = null;
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="frame-header">
      <div
        className="header-items icon-block"
        onClick={() => {
          setIsChat(true);
          setChatAlert({});
        }}
      >
        <FontAwesomeIcon className="icon" icon={faCommentAlt} />
        {!isChat && chatAlert.alert && (
          <span className="alert-circle-icon"></span>
        )}
      </div>
      <div className="header-items date-block">{currentTime}</div>
      <div className="header-items icon-block">
        <FontAwesomeIcon className="icon profile" icon={faUserCircle} />
      </div>
    </div>
  );
};

export default CallPageHeader;
