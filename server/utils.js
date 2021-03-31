export const transformData = (data) => ({
  id: data._id,
  source: data.source,
  sourceIdentityId: data.sourceIdentityId,
  state: data.state,
  payload: data.payload,
  reference: data.reference,
  created: data.created,
});