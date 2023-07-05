const formatHireDate = (col) => {
  let date = col?.hireDate?.toString();
  return date ? date?.split("T")[0] : "-";
};
const formatTerminationDate = (col) => {
  let date = col?.terminationDate?.toString();
  return date ? date?.split("T")[0] : "-";
};
const booleanToString = (colValue, col) => {
  if (colValue[col.field]) {
    return <span>Yes</span>;
  } else {
    return <span>No</span>;
  }
};

export { formatHireDate, formatTerminationDate, booleanToString };
