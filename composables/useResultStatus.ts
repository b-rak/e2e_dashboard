export default (lastResult: CasePassRate): string => {
  if (lastResult.falsePositiveCount > 0) {
    return "FALSEPOSITIVE";
  } else if (lastResult.failedCount > 0) {
    return "FAILED";
  } else if (lastResult.warningCount > 0) {
    return "WARNING";
  } else if (lastResult.skippedCount > 0) {
    return "SKIPPED";
  } else {
    return "PASSED";
  }
};
