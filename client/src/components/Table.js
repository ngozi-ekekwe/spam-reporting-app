import React from "react";
import { Button, Table, Label } from "semantic-ui-react";
import { reportTypeMap, tableHeader } from "../utils";

const TableView = ({ reports, updateReport }) => {
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
            return (
              <Table.Row key={i}>
                <Table.Cell>{element.payload.reportId}</Table.Cell>
                <Table.Cell>
                  {reportTypeMap[element.payload.reportType]}
                </Table.Cell>
                <Table.Cell warning>
                  <Label color={element.state === "BLOCKED" ? "red" : "grey"}>
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

                  {element.state !== "BLOCKED" && (
                    <Button
                      className="red"
                      onClick={() =>
                        updateReport("Blocked", element.payload.reportId)
                      }
                    >
                      Block
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default TableView;
