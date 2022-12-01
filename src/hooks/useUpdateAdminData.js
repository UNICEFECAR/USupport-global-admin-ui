import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminSvc } from "@USupport-components-library/services";
import { useError } from "./useError";

/**
 * Reuseable hook to get and transform the provider data in a desired format
 */
export default function useUpdateAdminData(onSuccess, onError) {
  const queryClient = useQueryClient();

  const updateAdminData = async (payload) => {
    const adminId = payload.adminId;
    delete payload.role;
    delete payload.isActive;

    let response;
    if (payload.updateById) {
      delete payload.updateById;
      response = await adminSvc.updateDataById(adminId, payload);
    } else {
      delete payload.adminId;
      response = await adminSvc.updateData(payload);
    }
    const { data } = response;
    return data;
  };

  const updateAdminDataMutation = useMutation(updateAdminData, {
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["admin-data"] });
    },
    onError: (error) => {
      consokle.log(error);
      const { message: errorMessage } = useError(error);
      onError(errorMessage);
    },
  });
  return updateAdminDataMutation;
}

export { useUpdateAdminData };
