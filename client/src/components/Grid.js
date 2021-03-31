import React from "react";
import { Grid } from "semantic-ui-react";
import SourceCard from "./Card";

const formatReportType = (type) => {
  let reportTypeDictionary = {
    'VIOLATES_POLICIES': 'Violates Policies',
    'SPAM' : 'Spam',
    'INFRINGES_PROPERTY': 'Infringes Property'
  }
  return reportTypeDictionary[type];
}

function GridView({ reports, updateReport }) {
  return (
    <div className="home">
      <Grid columns={3}>
        {reports &&
          reports.map((report, key) => {
            return (
              <Grid.Column key={key} mobile={16} tablet={8} computer={4}>
                <SourceCard
                  source={report.source}
                  referenceResourceType={report.payload.referenceResourceType}
                  reportType={formatReportType(report.payload.reportType)}
                  state={report.state}
                  reportId={report.payload.reportId}
                  updateReport={updateReport}
                />
              </Grid.Column>
            );
          })}
      </Grid>
    </div>
  );
}

export default GridView;
