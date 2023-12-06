import { useContext, useState } from "react";
import "./style.scss";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/mainContent/MainContent";
import Importer from "./components/importer/Importer";
import { DataContext } from "./context/DataContext";

function App() {
  const { openImporter } = useContext(DataContext);

  return (
    <div className="containerWrapper">
      <div className={openImporter ? "container fade" : "container"}>
        <div className="sidebarContainer">
          <Sidebar />
        </div>
        <div className="mainContentContainer">
          <MainContent />
        </div>
      </div>
      {openImporter && <Importer />}
    </div>
  );
}

export default App;
