export default function convertDateToString(inComingDate) {
  const monthNumber = inComingDate.getMonth() + 1;
  const dateNumber = inComingDate.getDate();
  const month =
    monthNumber.toString().split("").length < 2
      ? "0" + monthNumber
      : monthNumber;

  const date =
    dateNumber.toString().split("").length < 2 ? "0" + dateNumber : dateNumber;
  const stringDate = `${inComingDate.getFullYear()}-${month}-${date}`;
  return stringDate;
}
