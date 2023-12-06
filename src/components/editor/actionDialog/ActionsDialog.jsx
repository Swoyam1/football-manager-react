import "../actions.scss";
import EditIcon from "../../../icons/pen.svg";
import DeleteIcon from "../../../icons/trash-alt.svg";
// import RoadioIcon from "../../../icons/Group.svg";
import CloseIcon from "../../../icons/close.svg";

const ActionsDialog = ({ setOpenEditor, setOpenActions, setOpenConfirm }) => {
  const handleActionsOptionClick = (type) => {
    if (type === "editor") {
      setOpenConfirm(false);
      setOpenEditor(true);
    } else {
      setOpenEditor(false);
      setOpenConfirm(true);
    }
  };

  const handleActionsClose = () => {
    setOpenEditor(false);
    setOpenConfirm(false);
    setOpenActions(false);
  };
  return (
    <div className="actions">
      <div className="actionsHeader">
        <span>Actions</span>
        <img src={CloseIcon} alt="" onClick={handleActionsClose} />
      </div>
      <div className="editOptions">
        <div onClick={() => handleActionsOptionClick("editor")}>
          <img src={EditIcon} alt="" />
          <span>Edit Player</span>
        </div>
        <div onClick={() => handleActionsOptionClick("")}>
          <img src={DeleteIcon} alt="" />
          <span>Delete Player</span>
        </div>
      </div>
    </div>
  );
};

export default ActionsDialog;
