import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="nav">
      <div className="container">
        <nav className="nav-main">
          <NavLink to="/">
            <i className="fa-solid fa-house"></i>Home
          </NavLink>
          <NavLink to="/new-employee">
            <i className="fa-solid fa-user-plus"></i>Create an Employee
          </NavLink>
          <NavLink to="/employee-list">
            <i className="fa-regular fa-rectangle-list"></i>Employee List
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
