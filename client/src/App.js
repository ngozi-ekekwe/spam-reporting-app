import React, { useState, useEffect, useReducer } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import Header from "./components/Header";
import GridView from "./components/Grid";
import TableView from "./components/Table";
import PopupModal from "./components/Modal";
import EmptyState from "./components/EmptyState";

import { setReportViewToLocalStorage, getDefaulView, TABLE_VIEW } from "./utils";
import { getAllReports, updateReportStatus } from "./service";

function App() {
  
  let defaultView = getDefaulView() || TABLE_VIEW;
  const [reportView, setReportView] = useState(defaultView);
  const [reports, setReports] = useState([]);
  const [updatedList, setUpdatedList] = useState([]);
  const [loading, setIsLoading] = useState(true);

  function stateReducer(_state, action) {
    switch (action.type) {
      case "close":
        return { open: false };
      case "open":
        return { open: true, size: action.size };
      default:
        throw new Error("Unsupported action");
    }
  }

  const [state, dispatch] = useReducer(stateReducer, {
    open: false,
    size: undefined,
  });

  const { open, size } = state;

  const closeModal = () => {
    dispatch({ type: "close" });
    window.location.href= "/";
  };

  useEffect(() => {
    getAllReports().then((data) => {
      setReports(data);
      setIsLoading(false);
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

  const saveViewToLocalStorage = (view) => {
    setReportView(view);
    setReportViewToLocalStorage(view);
  };

  return (
    <div className="App">
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <Header
        reportView={reportView}
        setReportView={saveViewToLocalStorage}
      ></Header>
      <PopupModal
        size={size}
        open={open}
        content={updatedList}
        onClose={closeModal}
      />
      <div className="report-view">
        {!loading && reports.length > 0 && reportView === TABLE_VIEW ? (
          <TableView reports={reports} updateReport={updateReport} />
        ) : (
          <GridView reports={reports} updateReport={updateReport} />
        )}
        {!loading && reports.length <= 0 && <EmptyState />}
      </div>
    </div>
  );
}

export default App;
