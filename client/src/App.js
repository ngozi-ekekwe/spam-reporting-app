import React, { useState } from "react";
import Header from "./components/Header";
import GridView from "./components/Grid";
import TableView from "./components/Table";
import "semantic-ui-css/semantic.min.css";

function App() {
  const TABLE_VIEW = "table";
  const [reportView, setReportView] = useState(TABLE_VIEW);

  return (
    <div className="App">
      <Header reportView={reportView} setReportView={setReportView}></Header>
      <div className="report-view">{reportView === TABLE_VIEW ? <TableView /> : <GridView />}</div>
    </div>
  );
}

export default App;
