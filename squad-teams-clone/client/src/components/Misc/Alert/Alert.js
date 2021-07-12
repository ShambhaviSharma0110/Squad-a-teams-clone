import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import "./Alert.scss";

//this is for the text alert notif

const Alert = ({ chatAlert }) => {
  return (
    <div className="text-popup-wrap">
      <div className="alert-head">
        <FontAwesomeIcon className="icons" icon={faCommentAlt} />
        <h3>{chatAlert.payload.user}</h3>
      </div>
      <p className="text-alert">{chatAlert.payload.msg}</p>
    </div>
  );
};

export default Alert;
