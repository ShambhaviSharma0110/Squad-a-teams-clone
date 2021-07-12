import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faPhone,
   faDesktop,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./CallingFoot.scss";

//This includes the footer icons such as end call, muting and screen share

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
        {/* This will mute call */}
        <div
          className={`icon-space ${!isAudio ? "red-bg" : null}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isAudio ? faMicrophone : faMicrophoneSlash}
          />
        </div>
        {/* This will disconnect call */}
        <div className="icon-space" onClick={disconnectCall}>
          <FontAwesomeIcon className="icon red" icon={faPhone} />
        </div>
        <div
          className={`icon-space ${isVid ? "red-bg" : null}`}
          onClick={() => toggleVideo(!isVid)}
        >
          <FontAwesomeIcon className="icon" icon={faVideo} />
        </div>

         {/* This will allow screenshare */}

        {isPresenting ? (
          <div className="icon-space" onClick={stopScreenShare}>
            <FontAwesomeIcon className="icon red" icon={faDesktop} />
            <p className="title">Stop presenting</p>
          </div>
        ) : (
          <div className="icon-space" onClick={screenShare}>
            <FontAwesomeIcon className="icon " icon={faDesktop} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPageFooter;
