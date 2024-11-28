import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="nav">
      <div className="container">
        <nav className="nav-main">
          <NavLink to="/">
            <span className="fa-solid fa-house"></span>Home
          </NavLink>
          <NavLink to="/new-employee">
            <span className="fa-solid fa-user-plus"></span>Create an Employee
          </NavLink>
          <NavLink to="/employee-list">
            <span className="fa-regular fa-rectangle-list"></span>Employee List
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
