import axios, { AxiosResponse } from "axios";
import { RuleBook } from "../common/interfaces";

axios.defaults.baseURL = "https://rule-book.herokuapp.com/";

const getRule = async (url: string): Promise<AxiosResponse<RuleBook>> => {
  return await axios.post("/api/v1/rule/rule-url", { url });
};

export { getRule };
