import { Router } from "express";

import { getRuleWithUrl } from "../controllers/rule";

const ruleRouter = Router();

ruleRouter.post("/rule-url", getRuleWithUrl);

export { ruleRouter };
