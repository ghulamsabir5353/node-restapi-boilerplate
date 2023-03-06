const StatusTypes = Object.freeze({
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DELETED: 'Deleted',
});

const StatusTypesArray = Object.values(StatusTypes);

module.exports = {
  StatusTypes,
  StatusTypesArray,
};
