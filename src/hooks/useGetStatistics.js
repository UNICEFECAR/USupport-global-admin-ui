import { useQuery } from "@tanstack/react-query";
import { adminSvc } from "@USupport-components-library/services";

export default function useGetStatistics(countryId) {
  const fetchData = async () => {
    let response;

    if (countryId) {
      response = await adminSvc.getCountryStatistics(countryId);
    } else {
      response = await adminSvc.getGlobalStatistics();
    }
    const data = response.data;
    const formattedData = [
      { type: "clients", value: data.clientsNo },
      { type: "providers", value: data.providersNo },
      { type: "articles", value: data.publishedArticlesNo },
      { type: "consultations", value: data.scheduledConsultationsNo },
    ];
    return formattedData;
  };
  const statisticsQuery = useQuery(["statistics", countryId], fetchData);

  return statisticsQuery;
}

export { useGetStatistics };
