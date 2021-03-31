import React, { useState, useEffect, useReducer } from "react";
import Header from "./components/Header";
import GridView from "./components/Grid";
import TableView from "./components/Table";
import { getAllReports, updateReportStatus } from "./service";
import PopupModal from "./components/Modal";
import "semantic-ui-css/semantic.min.css";

function App() {
  const TABLE_VIEW = "table";
  const [reportView, setReportView] = useState(TABLE_VIEW);
  const [reports, setReports] = useState([]);
  const [updatedList, setUpdatedList] = useState([]);

  function stateReducer(state, action) {
    switch (action.type) {
      case "close":
        return { open: false };
      case "open":
        return { open: true, size: action.size };
      default:
        throw new Error("Unsupported action...");
    }
  }

  const [state, dispatch] = useReducer(stateReducer, {
    open: false,
    size: undefined,
  });

  const { open, size } = state;

  const closeModal = () => {
    dispatch({ type: "close" });
    window.location.reload(false);
  };

  useEffect(() => {
    getAllReports().then((data) => {
      setReports(data);
    });
  }, []);

  const updateReport = (status, reportId) => {
    updateReportStatus({
      reportId: reportId,
      ticketState: status,
    }).then((response) => {
      if (response) {
        setUpdatedList(response);
        return dispatch({
          type: "open",
          size: "tiny",
        });
      }
    });
  };

  return (
    <div className="App">
      <Header reportView={reportView} setReportView={setReportView}></Header>
      <PopupModal
        size={size}
        open={open}
        content={updatedList}
        onClose={closeModal}
      />
      <div className="report-view">
        {reportView === TABLE_VIEW ? (
          <TableView reports={reports} updateReport={updateReport} />
        ) : (
          <GridView reports={reports} updateReport={updateReport} />
        )}
      </div>
    </div>
  );
}

export default App;
