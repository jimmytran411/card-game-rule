import { Router } from "express";

import { getRuleWithUrl } from "../controllers/rule";

const ruleRouter = Router();

ruleRouter.get("/rule-url", getRuleWithUrl);

export { ruleRouter };
