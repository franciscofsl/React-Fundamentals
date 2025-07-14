import logo from '../assets/logo.png';

const Banner = () => {
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img src={logo} className="logo" alt="Logo"></img>
      </div>
      <div className="col-7 col-5">Providing houses all over the world</div>
    </header>
  );
};

export default Banner;
