import axios from "axios";
import { Request, Response } from "express";
import memoryCache from "memory-cache";

import { ruleAnalyser } from "../utils/ruleAnalyser";

const cacheTime = 60 * 60 * 1000;

const getRuleWithUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  const key = "__express__" + url;
  const cachedBody = memoryCache.get(key);
  if (cachedBody) {
    res.status(200).send(cachedBody);
  } else {
    try {
      const ruleBook = await axios.get(url);

      if (ruleBook) {
        const rules = ruleAnalyser(ruleBook.data);
        memoryCache.put(key, rules, cacheTime);
        res.status(200).send(rules);
      } else {
        res.status(400).send({ message: "Bad Request" });
      }
    } catch (error) {
      res.status(400).send({ message: "Invalid Url" });
    }
  }
};

export { getRuleWithUrl };
