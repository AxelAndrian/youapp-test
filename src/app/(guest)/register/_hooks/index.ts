import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../_api";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};
