export const getLatestStepResults = (
  dashboardId: number,
  caseId: number,
  stepId?: number
) => {
  return latestResults.filter((latestResult) => {
    if (stepId) {
      if (
        latestResult.caseId === caseId &&
        latestResult.environment === String(dashboardId) &&
        latestResult.stepId === stepId
      ) {
        return latestResult;
      }
    } else {
      if (
        latestResult.caseId === caseId &&
        latestResult.environment === String(dashboardId)
      ) {
        return latestResult;
      }
    }
  });
};

const latestResults = [
  {
    id: 2234472,
    caseId: 9,
    stepId: 236,
    stepName: "Header",
    environment: "4",
    createdDate: "2025-02-15T10:23:52",
    runtime: 1,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Header" ist Passed',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234473,
    caseId: 9,
    stepId: 237,
    stepName: "Footer",
    environment: "4",
    createdDate: "2025-02-15T10:23:56",
    runtime: 1,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Footer" ist Passed',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234462,
    caseId: 10,
    stepId: 238,
    stepName: "Blog Übersicht",
    environment: "4",
    createdDate: "2025-02-15T10:16:25",
    runtime: 1,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Blog Übersicht" ist Passed',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234463,
    caseId: 10,
    stepId: 239,
    stepName: "Blog Struktur",
    environment: "4",
    createdDate: "2025-02-15T10:16:28",
    runtime: 0,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Blog Struktur" ist Passed',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234506,
    caseId: 11,
    stepId: 240,
    stepName: "Jobanzeigen",
    environment: "4",
    createdDate: "2025-02-15T10:46:28",
    runtime: 0,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "SKIPPED",
    parameter: "Test wurde übersprungen.",
    randomToken: "dummylog.txt",
  },
  {
    id: 2234460,
    caseId: 12,
    stepId: 246,
    stepName: "Kontaktformular Fehlermeldungen",
    environment: "4",
    createdDate: "2025-02-15T10:14:01",
    runtime: 2,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Kontaktformular Fehlermeldungen" ist Passed',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234461,
    caseId: 12,
    stepId: 247,
    stepName: "Kontaktformular Abschicken",
    environment: "4",
    createdDate: "2025-02-15T10:16:21",
    runtime: 91,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "FAILED",
    parameter:
      'Timer ran out trying to Click on Element with Name "Abschicken Button" im View "Kontaktformular" after 30034 ms ',
    randomToken: "dummylog.txt",
  },
  {
    id: 1847616,
    caseId: 13,
    stepId: 243,
    stepName: "Mitarbeiter",
    environment: "4",
    createdDate: "2025-02-15T10:17:28",
    runtime: 31,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "423152",
    result: "FAILED",
    parameter:
      "0 isn't bigger than 4. did not expect to find [true] but found [false]",
    randomToken: "dummylog.txt",
  },
  {
    id: 2086225,
    caseId: 16,
    stepId: 248,
    stepName: "Header",
    environment: "5",
    createdDate: "2025-02-15T12:59:27",
    runtime: 16,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "",
    result: "PASSED",
    parameter: 'Der Testcase "Header" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2086226,
    caseId: 16,
    stepId: 249,
    stepName: "Footer",
    environment: "5",
    createdDate: "2025-02-15T12:59:42",
    runtime: 14,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "",
    result: "PASSED",
    parameter: 'Der Testcase "Footer" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2086212,
    caseId: 17,
    stepId: 250,
    stepName: "Blog Übersicht",
    environment: "5",
    createdDate: "2025-02-15T12:40:37",
    runtime: 15,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "557975",
    result: "PASSED",
    parameter: 'Der Testcase "Blog Übersicht" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2086213,
    caseId: 17,
    stepId: 251,
    stepName: "Blog Struktur",
    environment: "5",
    createdDate: "2025-02-15T12:40:46",
    runtime: 7,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "557975",
    result: "PASSED",
    parameter: 'Der Testcase "Blog Struktur" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2086214,
    caseId: 18,
    stepId: 252,
    stepName: "Jobanzeigen",
    environment: "5",
    createdDate: "2025-02-15T12:41:14",
    runtime: 17,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "557976",
    result: "PASSED",
    parameter: 'Der Testcase "Jobanzeigen" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2086210,
    caseId: 19,
    stepId: 253,
    stepName: "Kontaktformular Fehlermeldungen",
    environment: "5",
    createdDate: "2025-02-15T12:40:05",
    runtime: 5,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "557974",
    result: "WARNING",
    parameter: "E-Mail Fehlermeldung konnte nicht angezeigt werden",
    randomToken: "dummylog.txt",
  },
  {
    id: 2086211,
    caseId: 19,
    stepId: 254,
    stepName: "Kontaktformular Abschicken",
    environment: "5",
    createdDate: "2025-02-15T12:40:11",
    runtime: 5,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "557974",
    result: "WARNING",
    parameter: "Namens Fehlermeldung konnte nicht angezeigt werden",
    randomToken: "dummylog.txt",
  },
  {
    id: 1847627,
    caseId: 20,
    stepId: 263,
    stepName: "Mitarbeiter",
    environment: "5",
    createdDate: "2025-02-15T10:21:42",
    runtime: 16,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "423159",
    result: "FAILED",
    parameter:
      'Could not find element with name "Mitarbeiter" in view "Team". All database entries with name "Mitarbeiter" in view "Team" have found none or too many elements.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234465,
    caseId: 21,
    stepId: 255,
    stepName: "Header",
    environment: "6",
    createdDate: "2025-02-15T10:17:46",
    runtime: 49,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "FAILED",
    parameter:
      'Timer ran out trying to Click on element with name "Hamburger Button" in view "Header" after 37375ms ',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234466,
    caseId: 21,
    stepId: 256,
    stepName: "Footer",
    environment: "6",
    createdDate: "2025-02-15T10:17:57",
    runtime: 8,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Footer" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234469,
    caseId: 22,
    stepId: 264,
    stepName: "Blog Übersicht",
    environment: "6",
    createdDate: "2025-02-15T10:21:00",
    runtime: 66,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Blog Übersicht" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234470,
    caseId: 22,
    stepId: 265,
    stepName: "Blog Struktur",
    environment: "6",
    createdDate: "2025-02-15T10:21:14",
    runtime: 11,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Blog Struktur" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234471,
    caseId: 23,
    stepId: 266,
    stepName: "Jobanzeigen",
    environment: "6",
    createdDate: "2025-02-15T10:22:29",
    runtime: 64,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter: 'Der Testcase "Jobanzeigen" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234467,
    caseId: 24,
    stepId: 267,
    stepName: "Kontaktformular Fehlermeldungen",
    environment: "6",
    createdDate: "2025-02-15T10:18:54",
    runtime: 54,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "PASSED",
    parameter:
      'Der Testcase "Kontaktformular Fehlermeldungen" war erfolgreich.',
    randomToken: "dummylog.txt",
  },
  {
    id: 2234468,
    caseId: 24,
    stepId: 268,
    stepName: "Kontaktformular Abschicken",
    environment: "6",
    createdDate: "2025-02-15T10:19:51",
    runtime: 54,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "0",
    result: "FAILED",
    parameter:
      'Assertion "error": Element name "Erfolgsnachricht" in view "Kontaktformular" could not be identified. did not expect to find [true] but found [false]\'',
    randomToken: "dummylog.txt",
  },
  {
    id: 1847607,
    caseId: 25,
    stepId: 269,
    stepName: "Mitarbeiter",
    environment: "6",
    createdDate: "2025-02-15T10:13:52",
    runtime: 63,
    screenshot: "img/dummy.png",
    video: "img/dummy.png",
    falsePositive: 0,
    value: "423147",
    result: "FAILED",
    parameter:
      'Could not find element with name "Mitarbeiter" in view "Team". All database entries with name "Mitarbeiter" in view "Team" have found none or too many elements.',
    randomToken: "dummylog.txt",
  },
];
