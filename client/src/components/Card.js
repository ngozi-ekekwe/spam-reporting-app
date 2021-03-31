import React from "react";
import { Card, Button } from "semantic-ui-react";

function SourceCard({
  source,
  referenceResourceType,
  reportType,
  updateReport,
  reportId
}) {
  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>{reportType}</Card.Header>
          <Card.Meta>
            <span>{source}</span>
            <span className="date">{referenceResourceType}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              onClick={() => updateReport("closed", reportId)}
            >
              Resolve
            </Button>
            <Button
              basic
              color="red"
              onClick={() => updateReport("Blocked", reportId)}
            >
              Blocked
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export default SourceCard;
