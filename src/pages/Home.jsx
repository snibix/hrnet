import logo from "../assets/logo.png";
function Home() {
  return (
    <div className="container home">
      <h1 className="title-home">Wealth Health</h1>
      <img src={logo} alt="logo" />
      <p className="content-home">
        Welcome to HRnet! This is our company&apos;s internal application to
        create and view employee records
      </p>
    </div>
  );
}

Home.propTypes = {};

export default Home;
