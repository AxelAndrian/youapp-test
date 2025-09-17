import { RegisterPayload } from "../_entities";
import { api } from "@/_libs/axios/api";

export const registerApi = async (values: RegisterPayload) => {
  const res = await api.post("api/register", values);
  return res.data;
};
