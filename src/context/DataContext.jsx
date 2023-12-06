import { createContext, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [openRoster, setOpenRoster] = useState(true);
  const [openFormation, setOpenFormation] = useState(false);
  const [openImporter, setOpenImporter] = useState(false);
  const [isImported, setIsImported] = useState(false);

  const [cacheTableValues, setCacheTableValues] = useState(null);

  const [fileData, setFileData] = useState(null);

  //State to store table Column name
  const [tableHeader, setTableHeader] = useState(null);

  //State to store the values
  const [tableValues, setTableValues] = useState(null);

  const handleImporterOpen = () => {
    setOpenImporter((prev) => !prev);
    setFileData(null);
  };
  return (
    <DataContext.Provider
      value={{
        openRoster,
        setOpenRoster,
        openFormation,
        setOpenFormation,
        openImporter,
        setOpenImporter,
        isImported,
        setIsImported,
        cacheTableValues,
        setCacheTableValues,
        fileData,
        setFileData,
        tableHeader,
        setTableHeader,
        tableValues,
        setTableValues,
        handleImporterOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
