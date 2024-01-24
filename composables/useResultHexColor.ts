export default (result: string | CaseResult) => {
  let caseResult = "";
  if (typeof result === "string") {
    caseResult = result;
  } else {
    caseResult = result.falsePositive > 0 ? "FALSEPOSITIVE" : result.result;
  }
  if (caseResult === "FALSEPOSITIVE") {
    return "#cbd0d4";
  } else if (caseResult === "PASSED") {
    return "#1bb298";
  } else if (caseResult === "WARNING") {
    return "#ffc700";
  } else if (caseResult === "FAILED") {
    return "#ff6246";
  } else {
    return "#347ead";
  }
};
