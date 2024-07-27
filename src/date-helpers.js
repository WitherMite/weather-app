// Visual crossing sends dates in the queried location's timezone, so just using date objects as is has proved to be a headache
// Assuming dates are UTC when a date obj is needed and only using UTC methods/formatting should keep it in recieved timezone

const formatter = new Intl.DateTimeFormat(undefined, {
  timeZone: "UTC",
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(dateStr, timeStr) {
  const date = createUTCDate(dateStr, timeStr);
  console.log(date);
  return formatter.format(date);
}

function getDayOfMonth(dateStr) {
  const dateArr = dateStr.split("-");
  const dayArr = dateArr[2].split("");
  // remove leading 0's
  const day = dayArr[0] !== "0" ? dayArr.join("") : dayArr[1];
  return day;
}

function getDayOfWeek(dateStr) {
  const date = createUTCDate(dateStr);
  console.log(date);
  return date.getUTCDay();
}

function createUTCDate(dateStr, timeStr) {
  const dateArr = dateStr.split("-");
  // months are 0 indexed in Date.UTC args (for some reason days arent?)
  dateArr[1] = --dateArr[1];
  const timeArr = timeStr ? timeStr.split(":") : [];
  const dateTimeArr = [...dateArr, ...timeArr];
  return new Date(Date.UTC(...dateTimeArr));
}

export { formatDate, getDayOfMonth, getDayOfWeek };
