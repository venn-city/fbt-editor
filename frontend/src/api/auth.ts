import { CurrentUser, LoginUserRequest } from "../store/entities";
import { getAPIPath, request } from "./core";

export const fetchAuthClientData = (
  loginUserRequest: LoginUserRequest,
): Promise<CurrentUser> =>
  request<CurrentUser>(getAPIPath(`auth/getClientData`), {
    method: "GET",
  });

export const loginUser = (
  loginUserRequest: LoginUserRequest,
): Promise<CurrentUser> =>
  request<CurrentUser>(getAPIPath(`auth/login`), {
    method: "POST",
    data: loginUserRequest,
  });
