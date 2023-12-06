import React, { useContext, useEffect, useRef, useState } from "react";
import "./mainContent.scss";
import PlayerTable from "../playerTable/PlayerTable";
import Formation from "../formation/Formation";
import { DataContext } from "../../context/DataContext";
import HeaderDetails from "../headerDetails/HeaderDetails";

const MainContent = () => {
  const { openRoster, openFormation } = useContext(DataContext);

  return (
    <div className="mainContent">
      <HeaderDetails />
      <div className="playerDetails">
        {openRoster && <PlayerTable />}
        {openFormation && <Formation />}
      </div>
    </div>
  );
};

export default MainContent;
