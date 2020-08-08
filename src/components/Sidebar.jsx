import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="pages">
        <ul>
          <li>
            <NavLink to="/" activeClassName="current" exact>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" activeClassName="current" exact>
              Catalog
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/catalog/detail" activeClassName="current">
              Details
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
