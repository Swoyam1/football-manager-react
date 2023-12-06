import React, { useContext, useEffect, useState } from "react";
import "../formation.scss";
import { DataContext } from "../../../context/DataContext";

const PlayerStats = ({ lessStarters, excessStartes, statsDetails }) => {
  const { tableValues, tableHeader } = useContext(DataContext);

  const heightIndex = tableHeader?.indexOf("Height");
  const weightIndex = tableHeader?.indexOf("Weight");
  const nationalityIndex = tableHeader?.indexOf("Nationality");
  const appearancesIndex = tableHeader?.indexOf("Appearances");
  const minutesIndex = tableHeader?.indexOf("Minutes Played");
  const cleanSheetsIndex = tableHeader?.indexOf("Clean Sheets");
  const savesIndex = tableHeader?.indexOf("Saves");
  const imageIndex = tableHeader?.indexOf("Player Image");
  const flagIndex = tableHeader?.indexOf("Flag Image");
  const goalIndex = tableHeader?.indexOf("Goals ");
  const nameIndex = tableHeader?.indexOf("Player Name");
  const jerseyIndex = tableHeader?.indexOf("Jersey Number");
  const positionIndex = tableHeader?.indexOf("Position");
  const assistIndex = tableHeader?.indexOf("Assists");

  return (
    <div className="stats">
      <div className="line"></div>
      {tableValues && !lessStarters && !excessStartes && (
        <>
          <div className="image">
            <img src={statsDetails[imageIndex]} alt="" />
            <span className="jersey">{statsDetails[jerseyIndex]}</span>
            <span className="jerseyLarge">{statsDetails[jerseyIndex]}</span>
            <span className="name">{statsDetails[nameIndex]}</span>
            <span className="position">{statsDetails[positionIndex]}</span>
          </div>
          <div className="personal">
            <div className="height">
              <span>Height</span>
              <span>{`${statsDetails[heightIndex]} m`}</span>
            </div>
            <div className="weight">
              <span>Weight</span>
              <span>{`${statsDetails[weightIndex]} kg`}</span>
            </div>
            <div className="nationality">
              <span>Nationality</span>
              <div className="spec">
                <img src={statsDetails[flagIndex]} alt="" />
                <span>{statsDetails[nationalityIndex]}</span>
              </div>
            </div>
          </div>
          <div className="game">
            <div className="gameRow">
              <div>
                <span>{statsDetails[appearancesIndex]}</span>
                <span>Appearances</span>
              </div>
              <div>
                <span>{statsDetails[minutesIndex]}</span>
                <span>Minutes Played</span>
              </div>
            </div>
            <div className="gameRow">
              {statsDetails[positionIndex] === "Goalkeeper" ? (
                <>
                  <div>
                    <span>{statsDetails[cleanSheetsIndex]}</span>
                    <span>Clean sheets</span>
                  </div>
                  <div>
                    <span>{statsDetails[savesIndex]}</span>
                    <span>Saves</span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span>{statsDetails[goalIndex]}</span>
                    <span>Goals</span>
                  </div>
                  <div>
                    <span>{statsDetails[assistIndex]}</span>
                    <span>Assists</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerStats;
