import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTimes,

} from "@fortawesome/free-solid-svg-icons";
import "./MeetingInfo.scss";

const MeetingInfo = ({ setMeetInfo, url }) => {
  return (
    <div className="meeting-info-block">
      <div className="meeting-header">
        <h3>The session is ready and we hope so are you!</h3>
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => {
            setMeetInfo(false);
          }}
        />
      </div>
      
      <p className="info-text">
        You can share the link given below to invite people
      </p>
      <div className="meet-link">
        <span>{url}</span>
        <FontAwesomeIcon
          className="icon"
          icon={faCopy}
          onClick={() => navigator.clipboard.writeText(url)}
        />
      </div>
     
      
    </div>
  );
};

export default MeetingInfo;
