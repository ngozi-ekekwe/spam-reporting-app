import React from "react";
import { Button, Table, Label } from "semantic-ui-react";

const TableView = ({ reports, updateReport }) => {
  const tableHeader = ["Report ID", "Type", "State", "Message", "Actions"];

  const formatReportType = (type) => {
    let reportTypeDictionary = {
      VIOLATES_POLICIES: "Violates Policies",
      SPAM: "Spam",
      INFRINGES_PROPERTY: "Infringes Property",
    };
    return reportTypeDictionary[type];
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {tableHeader &&
            tableHeader.map((header, key) => {
              return <Table.HeaderCell key={key}>{header}</Table.HeaderCell>;
            })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {reports &&
          reports.map((element, i) => {
            console.log(element)
            return (
              <Table.Row key={i}>
                <Table.Cell>{element.payload.reportId}</Table.Cell>
                <Table.Cell>
                  {formatReportType(element.payload.reportType)}
                </Table.Cell>
                <Table.Cell warning>
                  <Label color={element.state === "Blocked" ? "red" : "grey"}>
                    {element.state}
                  </Label>
                </Table.Cell>
                <Table.Cell>{element.payload.message}</Table.Cell>
                <Table.Cell>
                  <Button
                    className="green"
                    success="true"
                    onClick={() =>
                      updateReport("closed", element.payload.reportId)
                    }
                  >
                    Resolve
                  </Button>

                  {
                    <Button
                      className="red"
                      onClick={() =>
                        updateReport("Blocked", element.payload.reportId)
                      }
                    >
                      Blocked
                    </Button>
                  }
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default TableView;
