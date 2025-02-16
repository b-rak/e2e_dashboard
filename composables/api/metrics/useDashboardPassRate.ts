import dashboardPassRate from "~/server/mocks/metrics/dashboardPassRate";
export default async (fromDate: string, toDate: string) =>
  sortRatiosByDate(dashboardPassRate);
// await useBaseFetch<Array<PassRate>>(
//   "/api/metrics/dashboardPassRate?from=" + fromDate + "&to=" + toDate
// );

// used for mocking
interface Ratio {
  date: string;
  ratio: number;
}

interface DashboardData {
  dashboardId: number;
  ratios: Ratio[];
}

function sortRatiosByDate(data: Array<DashboardData>) {
  return data.map((entry) => {
    return {
      ...entry,
      ratios: entry.ratios.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    };
  });
}
