import { useMutation } from "@tanstack/react-query";
import { adminSvc } from "@USupport-components-library/services";
import useError from "./useError";

export default function useDeleteAdminById(onSuccess, onError) {
  const deleteAdminById = async (id) => {
    const response = await adminSvc.deleteAdminById(id);
    return response;
  };
  const deleteAdminByIdMutation = useMutation(deleteAdminById, {
    onSuccess,
    onError: (err) => {
      const { message: erorMessage } = useError(err);
      onError(erorMessage);
    },
  });

  return deleteAdminByIdMutation;
}

export { useDeleteAdminById };
