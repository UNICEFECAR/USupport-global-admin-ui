import { useQuery } from "@tanstack/react-query";
import { adminSvc } from "@USupport-components-library/services";

export default function useGetAllGlobalAdmins() {
  const fetchData = async () => {
    const response = await adminSvc.getAllGlobalAdmins();

    const formattedData = [];
    for (const admin of response.data) {
      formattedData.push({
        adminId: admin.admin_id,
        name: admin.name + " " + admin.surname,
        email: admin.email,
        phonePrefix: admin.phone_prefix,
        phone: admin.phone,
        role: admin.role,
        isActive: admin.is_active,
        status: admin.is_active ? "active" : "inactive",
      });
    }

    return formattedData;
  };
  const globalAdminsQuery = useQuery(["global-admins"], fetchData, {});
  return globalAdminsQuery;
}
export { useGetAllGlobalAdmins };
