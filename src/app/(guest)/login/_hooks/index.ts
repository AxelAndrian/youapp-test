import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../_api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};
