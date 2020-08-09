import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="pages">
        <ul>
          <li>
            <NavLink to="/test_app/" activeClassName="current" exact>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/test_app/catalog" activeClassName="current" exact>
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
