import { RecentFile } from "../store/entities";
import { getAPIPath, request } from "./core";

export const fetchRecentFilesList = (): Promise<RecentFile[]> =>
  request<RecentFile[]>(getAPIPath(`recent-files`), {
    method: "GET",
    params: {},
  });
