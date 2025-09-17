import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProfileApi,
  getProfileApi,
  updateProfileApi,
} from "../_api/profile";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });
};

export const useCreateProfile = () => {
  return useMutation({
    mutationFn: createProfileApi,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileApi,
  });
};
