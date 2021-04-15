const { REACT_APP_URL = "http://localhost:3000" } = process.env;

export async function getAllReports() {
  const response = await fetch(`${REACT_APP_URL}/api/v1/reports`);
  return await response.json();
}

export async function updateReportStatus({ ticketState, reportId }) {
  const response = await fetch(`${REACT_APP_URL}/api/v1/reports/report/${reportId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticketState: ticketState.toUpperCase() }),
  });
  return await response.json();
}
