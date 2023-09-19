export {};

declare global {
  type Dashboard = {
    id: number;
    name: string;
    sorting: number;
    active: number;
    subtitle: string;
    icon: string;
  };

  type DashboardRatio = CaseResult & {
    case_id: number;
    row_num: number;
  };

  type PassRate = {
    dashboardId: number;
    ratios: Array<{
      date: string;
      ratio: nubmer;
    }>;
  };

  type Case = {
    id: number;
    identifier: string;
    readableName: string;
    subtitle: string;
    icon: string;
    createdDate: string;
    updatedDate: string;
    sorting: number;
    active: number;
    warningFailedThreshold: number;
    group: Dashboard;
    updatedDateAsString: string;
    createdDateAsString: string;
  };

  type CaseResult = {
    id: number;
    caseId: number;
    caseReadableName: string;
    environment: string;
    runtime: number;
    screenshot: string;
    video: string;
    falsePositive: number;
    result: string;
    testParameter: string;
    randomToken: string;
    createdDate: string;
    startedDate: string;
    endedDate: string;
  };

  type CaseResultAndObject = CaseResult & {
    caseObject: Case;
    createdDateAsString: string;
    startedDateAsString: string;
    endedDateAsString: string;
  };

  type DailyCaseRatio = {
    readableName: string;
    values: Array<{
      date: string;
      passed: number;
      failed: number;
    }>;
  };

  type Step = {
    id: number;
    identifier: string;
    readableName: string;
    createdDate: string;
    updatedDate: string;
    active: number;
    sorting: number;
    warningFailedThreshold: number;
    ticketCreated: number;
    case: Case;
  };

  type StepResult = {
    id: number;
    caseId: number;
    stepId: number;
    stepName: string;
    environment: string;
    createdDate: string;
    runtime: number;
    screenshot: string;
    video: string;
    falsePositive: number;
    value: string;
    result: string;
    parameter: string;
    randomToken: string;
  };

  type Runtime = {
    id: number;
    runtime: number;
    createdDate: string;
  };

  type CaseIdentifier = {
    dashboardId: number;
    caseId: number;
    stepIds: Array<{
      identifier: string;
      id: number;
    }>;
  };

  type Statistics = {
    caseID: number;
    caseCreatedDate: string;
    passed: number;
    failed: number;
  };

  type CaseRatios = {
    dashboardID: number;
    cases: Array<{
      caseName: string;
      passed: number;
      failed: number;
    }>;
  };
}
