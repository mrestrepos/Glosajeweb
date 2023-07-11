export const getId = (id) => isNaN(id) ? id : parseInt(id)

export const validateIds = (...ids) => ids.every(id => getId(id) === getId(ids[0]))