import { api } from "@/_libs/axios/api";
import { TProfile } from "../_entities/profile";

export const getProfileApi = async () => {
  const res = await api.get("api/getProfile");
  return res.data.data;
};

export const createProfileApi = async (
  payload: Omit<TProfile, "email" | "username" | "horoscope" | "zodiac">
) => {
  const res = await api.post("api/createProfile", payload);
  return res.data;
};

export const updateProfileApi = async (
  payload: Omit<TProfile, "email" | "username" | "horoscope" | "zodiac">
) => {
  const res = await api.post("api/updateProfile", payload);
  return res.data;
};
