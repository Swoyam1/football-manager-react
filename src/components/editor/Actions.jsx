import React, { useContext, useEffect, useState } from "react";
import "./actions.scss";
import ActionsDialog from "./actionDialog/ActionsDialog";
import ConfirmDialog from "./confirmDialog/ConfirmDialog";
import Editor from "./editorDialog/EditorDialog";

const Actions = ({
  openActions,
  setOpenActions,
  openEditor,
  setOpenEditor,
  openConfirm,
  setOpenConfirm,
  editPlayerData,
  rowIndex,
}) => {
  return (
    <>
      {openActions && (
        <>
          {" "}
          <ActionsDialog
            setOpenEditor={setOpenEditor}
            setOpenActions={setOpenActions}
            setOpenConfirm={setOpenConfirm}
          />
          {!openConfirm && openEditor && (
            <Editor
              editPlayerData={editPlayerData}
              setOpenEditor={setOpenEditor}
              setOpenActions={setOpenActions}
              openConfirm={openConfirm}
              rowIndex={rowIndex}
            />
          )}
          {!openEditor && openConfirm && (
            <ConfirmDialog
              setOpenActions={setOpenActions}
              setOpenConfirm={setOpenConfirm}
              rowIndex={rowIndex}
            />
          )}
        </>
      )}
    </>
  );
};

export default Actions;
