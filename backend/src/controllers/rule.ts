import axios from "axios";
import { Request, Response } from "express";

import { ruleAnalyser } from "../utils/ruleAnalyser";

const getRuleWithUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  const ruleBook = await axios.get(url);

  if (ruleBook) {
    const rules = ruleAnalyser(ruleBook.data);
    res.status(200).send(rules);
  } else {
    res.status(400).send({ message: "Bad Request" });
  }
};

export { getRuleWithUrl };
