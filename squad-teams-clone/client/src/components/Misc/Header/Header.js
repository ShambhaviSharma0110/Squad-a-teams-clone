import './Header.scss';
import img from '../../Images/squad-logo.png'

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src = {img}/>
        <span className="help-text">Microsoft Squad</span>
      </div>
    </div>
  );
};
export default Header;
