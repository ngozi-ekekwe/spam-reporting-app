import React from "react";
import { Grid } from "semantic-ui-react";
import SourceCard from "./Card";
import { reportTypeMap } from "../utils";

function GridView({ reports, updateReport }) {
  return (
    <Grid columns={3}>
      {reports &&
        reports.map((report, key) => {
          return (
            <Grid.Column key={key} mobile={16} tablet={8} computer={4}>
              <SourceCard
                source={report.source}
                referenceResourceType={report.payload.referenceResourceType}
                reportType={reportTypeMap[report.payload.reportType]}
                state={report.state}
                reportId={report.payload.reportId}
                updateReport={updateReport}
              />
            </Grid.Column>
          );
        })}
    </Grid>
  );
}

export default GridView;
