import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./Sidebar.css";

function SidebarNavbar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="https://github.com/StefanDespotovic">
            <FaGithub className="github" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/stefan-despotovicc/">
            <FaLinkedin className="blue" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCunJxkIQ2lUhozJXuuzvyag">
            <FaYoutube className="youtube" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SidebarNavbar;
