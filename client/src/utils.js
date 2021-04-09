
export const TABLE_VIEW = 'table'

export const setReportViewToLocalStorage = (view) => {
  localStorage.setItem("view", view);
};

export const getDefaulView = () => {
  return localStorage.getItem("view");
};

export const reportTypeMap = {
  SPAM: "Spam",
  VIOLATES_POLICIES: "Violates Policies",
  INFRINGES_PROPERTY: "Infringes Property",
};

export const tableHeader = ["Report ID", "Type", "State", "Message", "Actions"];
