import React, { useContext } from "react";
import "./sidebar.scss";
// import Logo from "../../icons/soccer-ball.svg";
import Logo from "../../icons/ball.jpg";
import Bars from "../../icons/bars.svg";
import Users from "../../icons/users-line.svg";
import EclipseIcon from "../../icons/eclipse.svg";
import { DataContext } from "../../context/DataContext";

const Sidebar = () => {
  const { openRoster, openFormation, setOpenRoster, setOpenFormation } =
    useContext(DataContext);

  const handleRosterMenuClick = () => {
    setOpenRoster(true);
    setOpenFormation(false);
  };

  const handleFormationMenuClick = () => {
    setOpenFormation(true);
    setOpenRoster(false);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div
        className={openRoster ? "bars" : "bars unselect"}
        onClick={handleRosterMenuClick}
      >
        <img
          className={openRoster ? "eclipse" : "eclipse unselect"}
          src={EclipseIcon}
          alt=""
        />
        <img src={Bars} alt="" />
      </div>
      <div
        className={openFormation ? "users" : "users unselect"}
        onClick={handleFormationMenuClick}
      >
        <img
          className={openFormation ? "eclipse" : "eclipse unselect"}
          src={EclipseIcon}
          alt=""
        />
        <img src={Users} alt="" />
      </div>
    </div>
  );
};

export default Sidebar;
