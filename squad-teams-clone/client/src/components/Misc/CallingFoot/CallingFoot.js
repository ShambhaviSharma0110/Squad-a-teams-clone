import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faPhone,
   faDesktop,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./CallingFoot.scss";

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  disconnectCall,
  isVid,
  toggleVideo,
}) => {
  return (
    <div className="footer-wrap">
      <div className="center">
        <div
          className={`icon-space ${!isAudio ? "red-bg" : null}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isAudio ? faMicrophone : faMicrophoneSlash}
          />
        </div>
        <div className="icon-space" onClick={disconnectCall}>
          <FontAwesomeIcon className="icon red" icon={faPhone} />
        </div>
        <div
          className={`icon-space ${isVid ? "red-bg" : null}`}
          onClick={() => toggleVideo(!isVid)}
        >
          <FontAwesomeIcon className="icon" icon={faVideo} />
        </div>

        {isPresenting ? (
          <div className="icon-space" onClick={stopScreenShare}>
            <FontAwesomeIcon className="icon red" icon={faDesktop} />
            <p className="title">Stop presenting</p>
          </div>
        ) : (
          <div className="icon-space" onClick={screenShare}>
            <FontAwesomeIcon className="icon " icon={faDesktop} />
            {/*<p className="title">Present now</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPageFooter;
