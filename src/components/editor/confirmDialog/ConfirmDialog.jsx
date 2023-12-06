import React, { useContext } from "react";
import "../actions.scss";
import CloseIcon from "../../../icons/close.svg";
import { DataContext } from "../../../context/DataContext";

const ConfirmDialog = ({ setOpenConfirm, setOpenActions, rowIndex }) => {
  const { setTableValues } = useContext(DataContext);

  const handleDeleteIconClick = () => {
    setTableValues((prevArray) => {
      return prevArray.filter((element, i) => i !== rowIndex);
    });
    setOpenConfirm(false);
    setOpenActions(false);
  };
  return (
    <div className="confirm">
      <div className="confirmHeader">
        <span>Are you sure?</span>
        <img src={CloseIcon} alt="" onClick={() => setOpenConfirm(false)} />
      </div>
      <div className="confirmContent">This action cannot be undone.</div>
      <div className="buttons">
        <button onClick={() => setOpenConfirm(false)}>Cancel</button>
        <button onClick={handleDeleteIconClick}>Delete</button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
