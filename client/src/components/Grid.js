import React from "react";
import { Grid } from "semantic-ui-react";
import SourceCard from "./Card";
import mock from "../mock/data";

function GridView() {
  return (
    <div className="home">
      
      <Grid columns={3}>
          {mock.elements.map((a, key) => {
            console.log(a, 'this is a')
            return (
              <Grid.Column key={key} mobile={8} tablet={8} computer={4}>
                <SourceCard
                  source={a.source}
                  referenceResourceType={a.payload.referenceResourceType}
                  reportType={a.payload.reportType}
                  state={a.payload.state}
                />
              </Grid.Column>
            );
          })}
      </Grid>
    </div>
  );
}


export default GridView;
