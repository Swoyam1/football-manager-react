import React, { useContext, useEffect, useState } from "react";
import "./formation.scss";
import FieldIcon from "../../icons/soccer-field.svg";
import { DataContext } from "../../context/DataContext";
import Warning from "./warnings/Warning";
import PlayerStats from "./playerStats/PlayerStats";
import FieldData from "./fieldData/FieldData";

const Formation = () => {
  const { tableHeader, tableValues } = useContext(DataContext);

  const [starters, setStarters] = useState(new Map());
  const [lessStarters, setLessStarters] = useState(false);
  const [excessStartes, setExcessStarters] = useState(false);
  const [statsDetails, setStatsDetails] = useState([]);
  const [starterGoalkeeperIndex, setStarterGoalkeeperIndex] = useState(null);
  const [selectedDiv, setSelectedDiv] = useState(null);

  const nameIndex = tableHeader?.indexOf("Player Name");
  const jerseyIndex = tableHeader?.indexOf("Jersey Number");
  const positionIndex = tableHeader?.indexOf("Position");
  const starterIndex = tableHeader?.indexOf("Starter");
  // if (statsDetails) {
  //   statsDetails[heightIndex] =
  //     statsDetails[heightIndex].slice(0, 1) +
  //     "." +
  //     statsDetails[heightIndex].slice(1);
  // }

  useEffect(() => {
    const getStarters = () => {
      const starterMap = new Map();
      tableValues?.map((row, index) => {
        const position = row[positionIndex];
        const starterBoolean = row[starterIndex];
        if (starterBoolean === "Yes") {
          if (starterMap.has(position)) {
            starterMap.set(position, starterMap.get(position) + 1);
          } else {
            starterMap.set(position, 1);
          }

          if (position === "Goalkeeper") {
            setStatsDetails(row);
            setStarterGoalkeeperIndex(index);
          }
        }
      });

      setStarters(starterMap);
    };

    getStarters();
  }, [tableValues]);

  useEffect(() => {
    const checkStarters = () => {
      starters.forEach((val, key) => {
        if (starters.size < 4) {
          setLessStarters(true);
          return;
        }
        if (key === "Goalkeeper") {
          if (val < 1) {
            setLessStarters(true);
          } else if (val > 1) {
            setExcessStarters(true);
          }
        } else if (key === "Defender") {
          if (val < 4) {
            setLessStarters(true);
          } else if (val > 4) {
            setExcessStarters(true);
          }
        } else if (key === "Forward" || key === "Midfielder") {
          if (val < 3) {
            setLessStarters(true);
          } else if (val > 3) {
            setExcessStarters(true);
          }
        }
      });
    };
    checkStarters();
    setSelectedDiv(starterGoalkeeperIndex);
  }, [starters]);

  const handlePlayerIconClick = (index, row) => {
    setStatsDetails(row);
    setSelectedDiv(index);
  };

  return (
    <div className="formation">
      <FieldData
        lessStarters={lessStarters}
        excessStartes={excessStartes}
        selectedDiv={selectedDiv}
        handlePlayerIconClick={handlePlayerIconClick}
      />
      <PlayerStats
        lessStarters={lessStarters}
        excessStartes={excessStartes}
        statsDetails={statsDetails}
      />
      <Warning lessStarters={lessStarters} excessStartes={excessStartes} />
    </div>
  );
};

export default Formation;
