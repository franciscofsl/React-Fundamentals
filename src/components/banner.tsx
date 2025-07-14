import logo from '../assets/logo.png';

const Banner = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="Logo"></img>
      </div>
      <div>Providing houses all over the world</div>
    </header>
  );
};

export default Banner;
