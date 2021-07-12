import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
//for the time on the head tab
  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="head-wrap">
      <div
        className="head-items icon-block"
        onClick={() => {
          setIsChat(true);
          setChatAlert({});
        }}
      >
        {/* shows the little alert icon on the message icon when a new message is received */}
        <FontAwesomeIcon className="icon" icon={faCommentAlt} />
        {!isChat && chatAlert.alert && (
          <span className="alert-circle-icon"></span>
        )}
      </div>
      <div className="head-items date-block">{currentTime}</div>
      <div className="head-items icon-block">
        <FontAwesomeIcon className="icon profile" icon={faUserCircle} />
      </div>
    </div>
  );
};

export default CallPageHeader;
