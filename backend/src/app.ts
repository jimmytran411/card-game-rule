import express, { NextFunction, Request, Response } from "express";
import memoryCache from "memory-cache";

import { ruleRouter } from "./routes/rule";

const app = express();
const CACHE_TIME = 30 * 60 * 1000;

const cache = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = memoryCache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      const body = req.body;
      memoryCache.put(key, body, duration);
      res.send(body);
      next();
    }
  };
};

app.use("/rule", cache(CACHE_TIME), ruleRouter);

export default app;
