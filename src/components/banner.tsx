import logo from '../assets/logo.png';
import styles from './banner.module.css';

const subtitleStyle = {
  fontStyle : "italic",
  fontSize : "x-large",
  color: "coral"
}

const Banner = (props: { headerText }) => {
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img src={logo} className={styles.logo} alt="Logo"></img>
      </div>
      <div className="col-7 col-5" style={subtitleStyle}>{props.headerText}</div>
    </header>
  );
};

export default Banner;
