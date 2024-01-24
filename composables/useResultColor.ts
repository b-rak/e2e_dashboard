export default (result: string | CaseResult) => {
  let caseResult = "";
  if (typeof result === "string") {
    caseResult = result;
  } else {
    caseResult = result.falsePositive > 0 ? "FALSEPOSITIVE" : result.result;
  }

  if (caseResult === "FALSEPOSITIVE") {
    return "status_false_positive";
  } else if (caseResult === "PASSED") {
    return "status_pass_100";
  } else if (caseResult === "WARNING") {
    return "status_warning_100";
  } else if (caseResult === "FAILED") {
    return "status_fail_100";
  } else {
    return "status_skip_100";
  }
};
