import axios, { AxiosResponse } from "axios";
import { RuleBook } from "../common/interfaces";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_DEFAULT_DEFAULT_URL;
}

const getRule = async (url: string): Promise<AxiosResponse<RuleBook>> => {
  return await axios.post("/api/v1/rule/rule-url", { url });
};

export { getRule };
