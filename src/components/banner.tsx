import logo from '@/assets/logo.png';
import styles from './banner.module.css';
import type { PropsWithChildren } from 'react';

const subtitleStyle = {
  fontStyle : "italic",
  fontSize : "x-large",
  color: "coral"
}
const Banner = ({children} : PropsWithChildren) => {
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img src={logo} className={styles.logo} alt="Logo"></img>
      </div>
      <div className="col-7 col-5" style={subtitleStyle}>{children}</div>
    </header>
  );
};

export default Banner;

/*

In javascript, we can use propTypes to validate the props passed to a component.
by default typescript already gives types, these are used.

import propTypes from 'prop-types';

Banner.propTypes = {
  headerText: propTypes.string.isRequired
};

*/