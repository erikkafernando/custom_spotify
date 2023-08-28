import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { Container, Icon, Menu, Sidebar } from "semantic-ui-react";
import Profile from "../profile/Profile";
import Dashboard from "../dashboard/Dashboard";
import Player from "../music-player/Player";

const MainApp = ({ token, setToken }) => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <Container>
      <Router>
        <Sidebar
          id="my-sidebar"
          as={Menu}
          icon="labeled"
          vertical
          visible
          width="thin"
        >
          <div id="sidebar-items">
            <Menu.Item
              as={Link}
              to="/home"
              active={activeItem === "home"}
              onClick={() => handleItemClick("home")}
            >
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/profile"
              active={activeItem === "profile"}
              onClick={() => handleItemClick("profile")}
            >
              <Icon name="user" />
              Profile
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/player"
              active={activeItem === "player"}
              onClick={() => handleItemClick("player")}
            >
              <Icon name="play circle" />
              Player
            </Menu.Item>

            <Menu.Item id="log-out" onClick={handleLogout}>
              <Icon name="log out" />
              Log out
            </Menu.Item>
          </div>
        </Sidebar>

        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/profile" element={<Profile token={token} />} />
          <Route path="/home" element={<Dashboard token={token} />} />
          <Route path="/player" element={<Player token={token} />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default MainApp;
