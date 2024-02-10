export default (user: User): string => {
  if (!user) return ""; // this case is used for the authenticate endpoint!
  const token = user.project;
  let backendURL = "";
  if (token === "ALL") {
    backendURL = "http://116.203.152.79:8000";
  } else if (token === "AVV") {
    backendURL = "http://avv.monitoring.appmatics.de";
  } else if (token === "BVG") {
    backendURL = "http://bvg.monitoring.appmatics.de";
  } else if (token === "DEMO") {
    backendURL = "http://116.203.152.79:8000";
  } else if (token === "KVB") {
    backendURL = "http://kvb.monitoring.appmatics.de";
  } else if (token === "MIGROS") {
    backendURL = "http://migros.monitoring.appmatics.de";
  } else if (token === "RHEINBAHN") {
    backendURL = "http://rheinbahn.monitoring.appmatics.de";
  } else if (token === "RMV") {
    backendURL = "http://rmv.monitoring.appmatics.de";
  } else if (token === "SCHAFERSHOP") {
    backendURL = "http://schaefershop.monitoring.appmatics.de";
  }
  return backendURL;
};
