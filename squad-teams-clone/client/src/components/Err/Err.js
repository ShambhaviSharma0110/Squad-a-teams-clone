import { Link } from "react-router-dom";
import "./Err.scss";
import Header from "../Misc/Header/Header";

//this is the 404 page in case anyone enters a route unknown

const Err = () => {
  return (
    <div className="err-wrap">
      <Header />
      <div className="err-content">
        <h2>Invalid video call name.</h2>
        <div className="action-btn">
          <Link className="btn green" to="/">
            Return to home screen
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Err;

