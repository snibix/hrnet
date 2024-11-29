import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="nav">
      <div className="container">
        <nav className="nav-main">
          <NavLink to="/" className="nav-link">
            <HomeIcon />
            &nbsp;Home
          </NavLink>
          <NavLink to="/new-employee" className="nav-link">
            <PersonAddAlt1Icon /> &nbsp;Create an Employee
          </NavLink>
          <NavLink to="/employee-list" className="nav-link">
            <ListAltIcon /> &nbsp;Employee List
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
