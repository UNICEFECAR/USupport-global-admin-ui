import { useMutation } from "@tanstack/react-query";
import { adminSvc } from "@USupport-components-library/services";
import { useError } from "./useError";

export default function useCreateAdmin(onSuccess, onError) {
  const createAdmin = async (data) => {
    data.email = data.email.toLowerCase();
    const response = await adminSvc.createAdmin(data);
    return response;
  };
  const createAdminMutation = useMutation(createAdmin, {
    onSuccess,
    onError: (error) => {
      const { message: errorMessage } = useError(error);
      onError(errorMessage);
    },
  });

  return createAdminMutation;
}

export { useCreateAdmin };
