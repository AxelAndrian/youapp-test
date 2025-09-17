import { LoginPayload } from "../_entities";
import { api } from "@/_libs/axios/api";

export const loginApi = async (values: LoginPayload) => {
  const res = await api.post("api/login", values);
  return res.data;
};
