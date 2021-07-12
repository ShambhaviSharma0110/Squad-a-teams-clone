import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo} from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import "./Home.scss";
import Header from "../Misc/Header/Header";
import img1 from "../Images/main-img.svg";

const HomePage = () => {
  const history = useHistory();

  const startCall = () => {
    const uid = shortid.generate();
    history.push(`/${uid}#init`);
  };

  return (
    <div className="home-wrap">
      <Header />
      <div className="body">
        <div className="lhs">
          <div className="content">
            <h2>Welcome to squad! We're glad you joined us.</h2>
            
              <strong>Scope of services</strong>
              <div className='features'>
                <ul>
                  <li>Video and audio calling</li>
                  <li>Muting</li>
                  <li>Chatting</li>
                  <li>Screen-sharing and showing your awesome work!</li>
                  <li>Mind-mapping app to help you gather your thoughts</li>
                  <li>
                    Event-scheduling on calendar because we know you're a busy
                    bee
                  </li>
                  <li>Whiteboard to let your thoughts run wild</li>
                </ul>
              </div>
            <div className="action-btn">
              <button className="btn" onClick={startCall}>
                <FontAwesomeIcon className="icon-space" icon={faVideo} />
                New Meeting
              </button>
              <br></br>
              <Link to="/whiteboard">
                <button className="btn">Whiteboard</button>
              </Link>
              <Link to="/calendar">
                <button className="btn">Calendar</button>
              </Link>
              <Link to="/mindmap">
                <button className="btn">Mind-Map</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="rhs">
          <div className="content">
            <img src={img1} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
