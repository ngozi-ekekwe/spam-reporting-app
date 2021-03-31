export const setReportViewToLocalStorage = (view) => {
  localStorage.setItem('view', view)
}

export const getDefaulView = () => {
  return localStorage.getItem('view')
}