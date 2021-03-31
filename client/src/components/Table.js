import React, { useState } from "react";
import { Button, Table, Label, Dimmer, Loader } from "semantic-ui-react";
import mock from "../mock/data";

const TableView = ({ data }) => {
  let tableHeader = ["Report ID", "Type", "State", "Message", "Actions"];

  const [loading, setLoading] = useState(false);

  const updateReportStatus = (buttonId, reportId) => {};

  return (
    <>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      {
        <Table celled>
          <Table.Header>
            <Table.Row>
              {tableHeader &&
                tableHeader.map((header, key) => {
                  return (
                    <Table.HeaderCell key={key}>{header}</Table.HeaderCell>
                  );
                })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {mock.elements.map((element, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell>{element.payload.reportId}</Table.Cell>
                  <Table.Cell>{element.payload.reportType}</Table.Cell>
                  <Table.Cell warning>
                    <Label className={element.state === "Blocked" && "red"}>
                      {element.state}
                    </Label>
                  </Table.Cell>
                  <Table.Cell>{element.payload.message}</Table.Cell>
                  <Table.Cell>
                    <Button
                      className="green"
                      success
                      onClick={() =>
                        updateReportStatus("Resolved", element.payload.reportId)
                      }
                    >
                      Resolve
                    </Button>

                    {
                      <Button
                        className="red"
                        onClick={() =>
                          updateReportStatus(
                            "Blocked",
                            element.payload.reportId
                          )
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
      }
    </>
  );
};

export default TableView;
