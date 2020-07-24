import { Project } from "../store/entities";
import { getAPIPath, request } from "./core";

export const fetchProjectsList = (): Promise<Project[]> =>
  request<Project[]>(getAPIPath(`projects`), { method: "GET", params: {} });
