import { useQuery } from "@tanstack/react-query";
import { adminSvc } from "@USupport-components-library/services";

export default function useGetAllCountryAdmins(countryId) {
  const fetchData = async () => {
    const response = await adminSvc.getAllCountryAdminsByCountry(countryId);

    const formattedData = [];
    for (const admin of response.data) {
      formattedData.push({
        adminId: admin.admin_id,
        name: admin.name,
        surname: admin.surname,
        email: admin.email,
        phone: admin.phone,
        phonePrefix: admin.phone_prefix,
        role: admin.role,
        isActive: admin.is_active,
      });
    }

    return formattedData;
  };
  const countryAdminsQuery = useQuery(["country-admins"], fetchData, {
    enabled: !!countryId,
  });
  return countryAdminsQuery;
}
export { useGetAllCountryAdmins };
