import Cookies from "js-cookie";

export const setToken = (data: any) => {
  Cookies.set("id", data.user.user.id);
  Cookies.set("username", data.user.user.username);
  Cookies.set("jwt", data.user.jwt);
  if (Cookies.get("username")) {
    window.location.reload();
  }
};

export const unsetToken = () => {
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");
  window.location.reload();
};

export const getUserFromCookies = () => {
  const user = Cookies.get("username");
  return user;
};
