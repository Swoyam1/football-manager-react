import React, { useContext } from "react";
import "../formation.scss";
import FieldIcon from "../../../icons/soccer-field.svg";
import { DataContext } from "../../../context/DataContext";

const FieldData = ({
  lessStarters,
  excessStartes,
  selectedDiv,
  handlePlayerIconClick,
}) => {
  const { tableValues, tableHeader } = useContext(DataContext);

  const starterIndex = tableHeader?.indexOf("Starter");
  const positionIndex = tableHeader?.indexOf("Position");
  const nameIndex = tableHeader?.indexOf("Player Name");
  const jerseyIndex = tableHeader?.indexOf("Jersey Number");

  let g = 1,
    d = 1,
    m = 1,
    f = 1;

  const getClassName = (val) => {
    if (val === "Goalkeeper") return g++;
    else if (val === "Defender") return d++;
    else if (val === "Midfielder") return m++;
    else if (val === "Forward") return f++;
  };

  return (
    <div className="field">
      <img src={FieldIcon} alt="" />
      {!lessStarters &&
        !excessStartes &&
        tableValues?.map((row, index) => {
          if (row[starterIndex] === "Yes") {
            return (
              <div
                className={`${row[positionIndex]} n${getClassName(
                  row[positionIndex]
                )}`}
              >
                <div
                  style={{
                    backgroundColor: selectedDiv === index ? "#FEA013" : "",
                  }}
                  onClick={() => handlePlayerIconClick(index, row)}
                >
                  {row[jerseyIndex]}
                </div>
                <span>{row[nameIndex]}</span>
              </div>
            );
          }
        })}
    </div>
  );
};

export default FieldData;
