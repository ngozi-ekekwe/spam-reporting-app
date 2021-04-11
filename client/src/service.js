export async function getAllReports() {
  const response = await fetch("/api/v1/reports");
  return await response.json();
}

export async function updateReportStatus({ ticketState, reportId }) {
  const response = await fetch(`/api/v1/reports/${reportId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticketState: ticketState.toUpperCase() }),
  });
  return await response.json();
}
