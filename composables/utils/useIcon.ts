export default (groupName: string, iconName: string): string => {
  if (groupName === "Web") return "desktop";
  else if (groupName === "iOS") return "apple";
  else if (groupName === "Android") return "android";
  else return iconName;
};
