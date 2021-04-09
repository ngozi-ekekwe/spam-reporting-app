import React from "react";
import { Button } from "semantic-ui-react";

function Header({ reportView, setReportView }) {
  const TABLE_VIEW = "table";
  const GRID_VIEW = "grid";

  return (
    <header className="header-wrapper">
      <div className="app-header">
        <a href="/" className="brand-logo">
          Reporter
        </a>
        <Button.Group>
          <Button
            positive={reportView === TABLE_VIEW}
            onClick={() => setReportView(TABLE_VIEW)}
          >
            TABLE
          </Button>
          <Button.Or />
          <Button
            positive={reportView === GRID_VIEW}
            onClick={() => setReportView(GRID_VIEW)}
          >
            GRID
          </Button>
        </Button.Group>
      </div>
    </header>
  );
}

export default Header;
