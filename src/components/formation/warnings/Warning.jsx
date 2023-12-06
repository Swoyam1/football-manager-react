import React, { useContext } from "react";
import "../formation.scss";
import WarningIcon from "../../../icons/warning.svg";
import { DataContext } from "../../../context/DataContext";

const Warning = ({ lessStarters, excessStartes }) => {
  const { tableValues } = useContext(DataContext);
  return (
    <>
      {(!tableValues || lessStarters || excessStartes) && (
        <div className="warning">
          <>
            {!tableValues && (
              <>
                <div>
                  <img src={WarningIcon} alt="" />
                  <span>No player data found</span>
                </div>
                <span>Please import your roster first</span>
              </>
            )}
            {lessStarters && (
              <>
                <div>
                  <img src={WarningIcon} alt="" />
                  <span>Not enough starters</span>
                </div>
                <span>
                  Your team doesn't have enough starters for one or more of the
                  positions in the 4-3-3 formation
                </span>
              </>
            )}
            {!lessStarters && excessStartes && (
              <>
                <div>
                  <img src={WarningIcon} alt="" />
                  <span>There are too many starters</span>
                </div>
                <span>
                  Your team has too many starters for one or more of the
                  positions in the 4-3-3 formation
                </span>
              </>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default Warning;
