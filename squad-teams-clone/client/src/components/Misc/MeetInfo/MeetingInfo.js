import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTimes,

} from "@fortawesome/free-solid-svg-icons";
import "./MeetingInfo.scss";

//contains the link to be shred to join meeting

const MeetingInfo = ({ setMeetInfo, url }) => {
  return (
    <div className="meet-info-wrap">
      <div className="meet-head">
        {/* to allow closing this block we call setINfo */}
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
