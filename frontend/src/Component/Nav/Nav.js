/*my current Nv.js*/
import React from "react";
import { Link } from "react-router-dom";


function Nav() {
  return (
    <header className="app-header">
      <nav className="main-nav">
        <Link to="/mainhome" className="nav-link">Home</Link>
        <Link to="/ScheduleProjectDetails" className="nav-link">Add Project</Link>
        <Link to="/AssignedTasks" className="nav-link">Assign Task</Link>
      </nav>
    </header>
  );
}

export default Nav;