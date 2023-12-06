import React, { useContext, useEffect, useState } from "react";
import "../actions.scss";
import CloseIcon from "../../../icons/close.svg";
import { DataContext } from "../../../context/DataContext";

const Editor = ({
  editPlayerData,
  setOpenEditor,
  setOpenActions,
  openConfirm,
  rowIndex,
}) => {
  const { tableHeader, tableValues, setTableValues } = useContext(DataContext);

  const [playerData, setPlayerData] = useState(editPlayerData);
  //console.log(editPlayerData);

  const nameIndex = tableHeader?.indexOf("Player Name");
  const jerseyIndex = tableHeader?.indexOf("Jersey Number");
  const positionIndex = tableHeader?.indexOf("Position");
  const heightIndex = tableHeader?.indexOf("Height");
  const weightIndex = tableHeader?.indexOf("Weight");
  const nationalityIndex = tableHeader?.indexOf("Nationality");
  const starterIndex = tableHeader?.indexOf("Starter");
  const flagIndex = tableHeader?.indexOf("Flag Image");

  const [nationalityData, setNationalityData] = useState(new Map());
  const positionData = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

  useEffect(() => {
    const getNationality = () => {
      const data = new Map();

      tableValues?.map((row) => {
        const nationality = row[nationalityIndex];
        const flag = row[flagIndex];
        if (!data.has(nationality)) {
          data.set(flag, nationality);
        }
      });

      setNationalityData(data);
    };

    getNationality();
  }, [tableValues]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    setPlayerData((prevData) => {
      const newArray = [...prevData];
      newArray[index] = value;
      return newArray;
    });
  };

  const handleEditIconClick = () => {
    setTableValues((prevArray) => {
      const newArray = [...prevArray];
      newArray[rowIndex] = playerData;
      return newArray;
    });
    setOpenEditor(false);
    setOpenActions(false);
  };

  return (
    <div className="editor">
      <div className="editorHeader">
        <span>Edit Player</span>
        <img
          disabled={openConfirm}
          src={CloseIcon}
          alt=""
          onClick={() => setOpenEditor(false)}
        />
      </div>
      <div className="editorContent">
        <div className="textInput">
          <div className="name">
            <span>Player Name</span>
            <input
              type="text"
              value={playerData[nameIndex]}
              onChange={(e) => handleChange(e, nameIndex)}
            />
          </div>
          <div className="jersey">
            <span>Jersey Number</span>
            <input
              type="text"
              value={playerData[jerseyIndex]}
              onChange={(e) => handleChange(e, jerseyIndex)}
            />
          </div>
        </div>
        <div className="textInput">
          <div className="height">
            <span>Height</span>
            <input
              type="text"
              value={playerData[heightIndex]}
              onChange={(e) => handleChange(e, heightIndex)}
            />
          </div>
          <div className="jersey">
            <span>Weight</span>
            <input
              type="text"
              value={playerData[weightIndex]}
              onChange={(e) => handleChange(e, weightIndex)}
            />
          </div>
        </div>
        <div className="selectInput">
          <span>Nationality</span>
          {console.log(nationalityData)}
          <select
            name=""
            id=""
            defaultValue={playerData[nationalityIndex]}
            onChange={(e) => handleChange(e, nationalityIndex)}
          >
            {Array.from(nationalityData?.keys()).map((val, key) => (
              <option value={key}>{nationalityData?.get(val)}</option>
            ))}
          </select>
        </div>
        <div className="selectInput">
          <span>Position</span>
          <select
            name=""
            id=""
            defaultValue={playerData[positionIndex]}
            onChange={(e) => handleChange(e, positionIndex)}
          >
            {positionData.map((position) => (
              <option value={position}>{position}</option>
            ))}
          </select>
        </div>
        <div className="radioOption">
          <span>Starter</span>
          <div>
            <label htmlFor="no">
              <input
                id="no"
                type="radio"
                value="No"
                name="starter"
                checked={playerData[starterIndex] === "No"}
                onChange={(e) => handleChange(e, starterIndex)}
              />
              {/* {<img src={RoadioIcon} alt="" />} */}
              <span>No</span>
            </label>
            <label htmlFor="yes">
              <input
                id="yes"
                type="radio"
                value="Yes"
                name="starter"
                checked={playerData[starterIndex] === "Yes"}
                onChange={(e) => handleChange(e, starterIndex)}
              />
              {/* <img src={RoadioIcon} alt="" /> */}
              <span>Yes</span>
            </label>
          </div>
        </div>
      </div>

      <button onClick={handleEditIconClick}>Edit Player</button>
    </div>
  );
};

export default Editor;
