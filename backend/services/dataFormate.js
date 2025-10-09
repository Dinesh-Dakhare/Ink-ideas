const formatDateToMonth = (date) => {
  const newDate = new Date(date);
  const dateString = newDate.toLocaleString("default", { month: "long" });
  const dayString = newDate.getDate();

  return `${dayString} ${dateString}`;
};

export default formatDateToMonth;
