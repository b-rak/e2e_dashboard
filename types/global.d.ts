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
    caseId: number;
    environment: string;
    result: string;
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
    value: string | number;
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
      id: number;
      numberOfCases: number;
      icon: string;
      cases: Array<string>;
    }>;
    mainFiles: string;
  };

  type staticDashboardCases = {
    dashboards: Array<Dashboard>;
    cases: Array<{
      groupId: number;
      caseList: Array<Case>;
    }>;
  };

  type sortedCasePassRate = {
    dashId: number;
    cases: Array<{ caseId: number; results: CasePassRate[] }>;
  };

  // User Authentication
  type JWT = {
    access_token: string;
    refresh_token: string;
  };

  interface QueryParams {
    [key: string]: string | number | boolean;
  }

  type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    project: string;
  };
}
