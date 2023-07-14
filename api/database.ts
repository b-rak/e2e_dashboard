export function getRandomResults(iterations: number) {
  let data = [];
  for (let i = 0; i < iterations; i++) {
    data.push({
      id: i,
      passed: Math.round(Math.random() * 10) / 10,
      runtime: Math.floor(Math.random() * 60),
    });
  }
  return data;
}

export function getResults() {
  const rand = Math.floor(Math.random() * 21);
  return [
    {
      result: "passed",
      number: 20 - rand,
    },
    {
      result: "failed",
      number: rand,
    },
  ];
}

/*
// Test old 'backend'
const mysql = require("mysql2");

const db_host = "dedi7158.your-server.de";
const db_name = "globus_db7";
const db_user = "monite_7";
const db_password = "vpVx9S9kUSXbuYaZ";

const connection = mysql.createConnection({
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_name,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

const configDB = {
  logo: "/images/globus.png",
  icon: "/images/icon.png",
  title: "Monitoring Dashboard",
  caseRuntimeMin: "10",
  notificationinterval: "30",
  domainName: "globus.appmatics.de",
  mainFiles: "//files.appmatics.de/",
  ScreenshotPath: "https://files.testmatics.com",
  VideoPath: "https://files.testmatics.com",
  LogfilePath: "//files.appmatics.de",
  hoursNotInStats: "0",
  noAlertsBefore: "5",
  inputmapping: "inputmapping",
  name: "logData", // Name of the Logfile Table
  maxTestingSeconds: "280",
  maxTestingSecondsCase: "60",
  tableName_cases: "cases",
  tableName_results: "results",
  tableName_additionals: "additionals",
  tableName_additionals_results: "additionals_results",
  tableName_users: "users",
  tableName_user_alerts: "users_alerts",

  cases: {
    tableName_cases: "cases",
    case_id: "case_id",
    environment: "environment",
    createdDate: "createdDate",
    startedDate: "startedDate",
    endedDate: "endedDate",
    runtime: "runtime",
    screenshot: "screenshot",
    video: "video",
    falsePositive: "falsePositive",
    result: "result",
  },
};

//db operations
const tableName_cases = configDB.tableName_cases;

const query = `
    SELECT * FROM ${tableName_cases} cases
    WHERE cases.active = 1
    ORDER BY cases.groups_id ASC, cases.sorting ASC
  `;

connection.query(query, (err, results) => {
  if (err) {
    console.error("Error executing query:", err);
    return;
  }
  console.log("Query results:", results);

  // Process the query results here
});

connection.end();
*/
