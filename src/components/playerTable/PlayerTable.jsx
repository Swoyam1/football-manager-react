import React, { createContext, useContext, useEffect, useState } from "react";
import "./playerTable.scss";
import EllipsisIcon from "../../icons/ellipsis.svg";
import Actions from "../editor/Actions";
import { DataContext } from "../../context/DataContext";

const PlayerTable = () => {
  const {
    isImported,
    handleImporterOpen,
    tableHeader,
    tableValues,
    setTableValues,
  } = useContext(DataContext);

  const [headerIndex, setHeaderIndex] = useState([]);
  const [openActions, setOpenActions] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editPlayerData, setEditPlayerData] = useState([]);
  const [editPlayerHeaderIndex, setEditPlayerHeaderIndex] = useState([]);
  const [rowIndex, setRowIndex] = useState(0);

  const toRemoveHeader = [
    "Player Image",
    "Flag Image",
    "Goals ",
    "Assists",
    "Clean Sheets",
    "Saves",
  ];

  useEffect(() => {
    const indexArray = [];
    tableHeader &&
      toRemoveHeader.map((header) =>
        indexArray.push(tableHeader.indexOf(header))
      );
    setHeaderIndex(indexArray);
  }, [isImported]);

  const getValue = (row, index, rIndex, value) => {
    if (index === tableHeader.length - 1) {
      return (
        <span className="ellipsis">
          {!headerIndex.includes(index) && <span>{value}</span>}
          <img
            className="ellipsis"
            src={EllipsisIcon}
            alt=""
            onClick={() => handleActionsOpen(row, rIndex)}
          />
        </span>
      );
    }
    const playerNameIndex = tableHeader.indexOf("Player Name");
    const flagIndex = tableHeader.indexOf("Flag Image");
    const heightIndex = tableHeader.indexOf("Height");
    const weightIndex = tableHeader.indexOf("Weight");

    if (index === playerNameIndex) {
      //console.log(idx);
      return (
        <span className="hasFlag">
          <img src={row[flagIndex]} alt="" /> <span>{value}</span>
        </span>
      );
    } else if (index === heightIndex) {
      value = value.slice(0, 1) + "." + value.slice(1);
      return `${value} m`;
    } else if (index === weightIndex) {
      return `${value} kg`;
    } else {
      return value;
    }
  };

  const editPlayerHeader = [
    "Player Name",
    "Jersey Number",
    "Height",
    "Weight",
    "Nationality",
    "Position",
    "Starter",
  ];

  useEffect(() => {
    const getEditPlayerHeaderIndex = () => {
      const indexArray = [];

      editPlayerHeader.map((header) => {
        indexArray.push(tableHeader.indexOf(header));
      });

      return indexArray;
    };
    tableHeader && setEditPlayerHeaderIndex(getEditPlayerHeaderIndex());
  }, [tableHeader]);

  const handleActionsOpen = (row, rIndex) => {
    setOpenActions(true);
    setEditPlayerData(row);
    setRowIndex(rIndex);
  };

  return (
    <div className="playerTable">
      <table>
        <thead>
          <tr>
            {isImported && tableHeader ? (
              tableHeader.map(
                (title, index) =>
                  !headerIndex.includes(index) && <th key={index}>{title}</th>
              )
            ) : (
              <>
                <th>Player Name</th>
                <th>Jersey Number</th>
                <th>Position</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Nationality</th>
                <th>Starter</th>
                <th>Appearances</th>
                <th>Minutes Played</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {isImported &&
            tableValues?.map((row, rIndex) => (
              <tr key={rIndex}>
                {row.map(
                  (value, index) =>
                    (!headerIndex.includes(index) ||
                      index === tableHeader.length - 1) && (
                      <td key={index}>{getValue(row, index, rIndex, value)}</td>
                    )
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {!isImported && (
        <div className="importOption">
          <span>You do not have any players on the roster</span>
          <button onClick={handleImporterOpen}>Import Team</button>
        </div>
      )}
      <Actions
        openActions={openActions}
        setOpenActions={setOpenActions}
        openEditor={openEditor}
        setOpenEditor={setOpenEditor}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        tableHeader={tableHeader}
        editPlayerData={editPlayerData}
        setEditPlayerData={setEditPlayerData}
        editPlayerHeaderIndex={editPlayerHeaderIndex}
        setTableValues={setTableValues}
        rowIndex={rowIndex}
        tableValues={tableValues}
      />
    </div>
  );
};

export default PlayerTable;
