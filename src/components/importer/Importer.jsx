import React, { useContext, useEffect, useState } from "react";
import "./importer.scss";
import CloseIcon from "../../icons/close.svg";
import Papa from "papaparse";
import { DataContext } from "../../context/DataContext";

const summaryTitle = [
  "Total Player",
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
];

const Importer = () => {
  const {
    setOpenImporter,
    handleImporterOpen,
    setFileData,
    setTableHeader,
    setTableValues,
    setIsImported,
    setCacheTableValues,
  } = useContext(DataContext);

  const [fileName, setFileName] = useState("");
  // const [fileData, setFileData] = useState(null);
  const [dataMissing, setDataMissing] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  // //State to store table Column name
  // const [tableHeader, setTableHeader] = useState([]);

  // //State to store the values
  // const [tableValues, setTableValues] = useState([]);

  const changeHandler = (event) => {
    setDataMissing(false);
    setButtonDisabled(true);
    setTableHeader([]);
    setIsImported(false);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    const file = event.target.files[0];

    const fileNameParts = file.name.split(".");
    const fileNameWithoutExtension = fileNameParts[0];
    const fileExtension = fileNameParts[1];

    if (fileNameWithoutExtension.length > 20) {
      setFileName(
        `${fileNameWithoutExtension.substring(0, 20)}...${fileExtension}`
      );
    } else {
      setFileName(file.name);
    }

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const headerArray = [];
        const valuesArray = [];
        const dataArray = [];
        const positionArray = [];
        let error = false;

        //console.log(results.data);
        setFileData(results.data);

        results.data.map((d) => {
          dataArray.push(d);
          headerArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        //console.log(dataArray);
        dataArray.map((val) => {
          positionArray.push(val.Position);
        });
        //console.log(positionArray);
        //console.log(valuesArray);
        valuesArray.map((val) => {
          if (val.includes("")) {
            setDataMissing(true);
            error = true;
            return;
          }
        });
        if (error) {
          // setTableHeader(null);
          // setTableValues(null);
          return;
        }

        setButtonDisabled(false);
        // count file summary
        const counts = new Map();
        counts.set("Total Player", positionArray.length);
        for (let str of positionArray) {
          if (counts.has(str)) {
            counts.set(str, counts.get(str) + 1);
          } else {
            counts.set(str, 1);
          }
        }
        //console.log(counts);

        setSummaryData(counts);

        setTableHeader(headerArray[0]);
        setTableValues(valuesArray);
        setCacheTableValues(valuesArray);
      },
    });
  };

  const handleImportClick = () => {
    if (!isButtonDisabled) {
      setOpenImporter(false);
      setIsImported(true);
    }
  };

  return (
    <div className="importer">
      <div className="importerContent">
        <div className="importerHeader">
          <span>Importer</span>
          <img src={CloseIcon} alt="" onClick={handleImporterOpen} />
        </div>
        <div className="line"></div>
        <div className="upload">
          <span className="fileTitle">Roster File</span>
          <div className="fileSelect">
            <input
              id="file"
              type="file"
              accept=".csv"
              onChange={changeHandler}
              placeholder="No"
            />
            <div className={!dataMissing ? "input" : "input error"}>
              <span>{fileName !== "" ? fileName : "No file selected"}</span>
              <label htmlFor="file">
                <div>Select File</div>
              </label>
            </div>
          </div>
          <span className="format">
            {!dataMissing ? (
              "File must be in .csv format"
            ) : (
              <>
                <p>Error</p>
                <p>
                  Your sheet is missing data. Please ensure all cells are filled
                  out.
                </p>
              </>
            )}
          </span>
        </div>
        {!dataMissing && summaryData && (
          <div className="fileSummary">
            <span>File Summary</span>
            <table>
              <thead>
                <tr>
                  {summaryTitle.map((title) => (
                    <th key={title}>{title + "s"}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {summaryTitle.map((title) => (
                    <td key={title}>{summaryData?.get(title)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button
        className={!dataMissing && summaryData ? "active" : ""}
        onClick={handleImportClick}
        disabled={isButtonDisabled}
      >
        Import
      </button>
    </div>
  );
};

export default Importer;
