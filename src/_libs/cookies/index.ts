import Cookies from "js-cookie";

export const SessionToken = {
  set: (val: { access_token: string }) =>
    Cookies.set("token", JSON.stringify(val)),
  get: (): {
    access_token: string;
  } | null => {
    const token = Cookies.get("token");
    if (!token) return null;

    return JSON.parse(token);
  },
  remove: () => Cookies.remove("token"),
};
