import React, { useContext, useEffect, useRef, useState } from "react";
import "../mainContent/mainContent.scss";
import EditIcon from "../../icons/pen.svg";
import SearchIcon from "../../icons/search.svg";
import CloseIcon from "../../icons/close.svg";
import { DataContext } from "../../context/DataContext";

const HeaderDetails = () => {
  const {
    openRoster,
    openImporter,
    isImported,
    handleImporterOpen,
    tableHeader,
    tableValues,
    setTableValues,
    cacheTableValues,
  } = useContext(DataContext);

  const [teamName, setTeamName] = useState("My Team");
  const [openEditTeam, setOpenEditTeam] = useState(false);
  const inputRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [activateClearIcon, setActivateClearIcon] = useState(false);

  const handleEditTeamName = (e) => {
    setOpenEditTeam((prev) => !prev);
  };

  useEffect(() => {
    if (openEditTeam) {
      inputRef.current.focus();
    }
  }, [openEditTeam]);

  useEffect(() => {
    setTableValues;
  }, [searchText]);

  const handleSearch = (text) => {
    setActivateClearIcon(true);
    const filtered = tableValues?.filter((row) => {
      const nameIndex = tableHeader?.indexOf("Player Name");
      const positionIndex = tableHeader?.indexOf("Position");
      const playerName = row[nameIndex];
      const playerPosition = row[positionIndex];

      return (
        playerName.toLowerCase().includes(text.toLowerCase()) ||
        playerPosition.toLowerCase().includes(text.toLowerCase())
      );
    });
    setTableValues(filtered);
  };

  const handleClear = () => {
    setSearchText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchText);
    } else if (event.key === "Escape") {
      handleClear();
      cacheTableValues && setTableValues(cacheTableValues);
    }
  };

  const handleInputChange = (e) => {
    if (activateClearIcon) {
      setTableValues(cacheTableValues);
    }
    setSearchText(e.target.value);
  };

  const handleClearIconClick = (e) => {
    handleClear();
    setActivateClearIcon(false);
    cacheTableValues && setTableValues(cacheTableValues);
  };
  return (
    <div className="header">
      <div className="headerLeft">
        <span>{openRoster ? "Roster Details" : "Formation Overview"}</span>
        <div className="teamName">
          {!openEditTeam && <span>{teamName}</span>}
          {openEditTeam && (
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => setTeamName(e.target.value)}
              value={teamName}
            />
          )}

          <img
            className={
              teamName === "My Team" || openEditTeam
                ? "editIcon display"
                : "editIcon"
            }
            src={EditIcon}
            alt=""
            onClick={handleEditTeamName}
          />
        </div>
      </div>
      {openRoster && (
        <div className="headerRight">
          <label htmlFor="search">
            <div className="searchBar">
              <div className="leftContent">
                <img src={SearchIcon} alt="" />
                <input
                  id="search"
                  type="text"
                  placeholder="Find player"
                  value={searchText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="rightContent">
                {searchText && !activateClearIcon && (
                  <span onClick={() => handleSearch(searchText)}>Search</span>
                )}
                {activateClearIcon && searchText !== "" && (
                  <img src={CloseIcon} alt="" onClick={handleClearIconClick} />
                )}
              </div>
            </div>
          </label>
          <button
            className={
              openImporter
                ? "importButton open"
                : isImported
                ? "importButton muted"
                : "importButton"
            }
            onClick={handleImporterOpen}
          >
            {isImported ? "Re-Import Team" : "Import Team"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderDetails;
