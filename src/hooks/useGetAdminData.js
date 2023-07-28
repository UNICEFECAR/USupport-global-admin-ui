import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminSvc } from "@USupport-components-library/services";

export default function useGetAdminData(id = null) {
  const [adminData, setAdminData] = useState();
  const fetchData = async () => {
    let data;
    if (id) {
      const response = await adminSvc.getDataById(id);
      data = response.data;
    } else {
      const response = await adminSvc.getData();
      data = response.data;
    }

    data.adminId = data.admin_id;
    data.isActive = data.is_active;

    delete data.admin_id;
    delete data.is_active;
    delete data.password;
    return data;
  };
  const adminDataQuery = useQuery(["admin-data", id], fetchData, {
    onSuccess: (data) => {
      const dataCopy = JSON.parse(JSON.stringify(data));
      setAdminData({ ...dataCopy });
    },
    notifyOnChangeProps: ["admin-data"],
  });
  return [adminDataQuery, adminData, setAdminData];
}

export { useGetAdminData };
