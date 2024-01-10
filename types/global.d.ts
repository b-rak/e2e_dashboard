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

  type CaseRatio = {
    dashboardId: number;
    caseId: number;
    passed: number;
    failed: number;
    warning: number;
    skipped: number;
  };

  type LatestCaseResult = {
    id: number;
    case_id: number;
    environment: string;
    createdDate: string;
    startedDate: string;
    endedDate: string;
    runtime: number;
    screenshot: string;
    video: string;
    falsePositive: number;
    result: string;
    testparameter: string;
    randomtoken: string;
    row_num: number;
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
    groupId: number;
    active: number;
    warningFailedThreshold: number;
  };

  type CasePassRate = {
    value: string;
    passedCount: number;
    failedCount: number;
    warningCount: number;
    skippedCount: number;
    falsePositiveCount: number;
    environment: string;
    caseId: number;
    createdDate: string;
  };

  type Step = {
    id: number;
    caseObject: Omit<Case, groupId> & {
      group: Dashboard;
      createdDateAsString: string;
      updatedDateAsString: string;
    };
    identifier: string;
    readableName: string;
    createdDate: string;
    updatedDate: string;
    active: number;
    sorting: number;
    warningFailedThreshold: number;
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

  type DailyCaseRatio = {
    caseId: number;
    readableName: string;
    values: Array<{
      date: string;
      passed: number;
      failed: number;
    }>;
  };

  type ConfigData = {
    mainName: string;
    logo: string;
    cases: Array<{
      name: string;
      icon: string;
      color: string;
      casetype: string;
    }>;
    numberOfCases: number;
    dashboards: Array<{
      name: string;
      numberOfCases: number;
    }>;
    mainFiles: string;
  };
}
