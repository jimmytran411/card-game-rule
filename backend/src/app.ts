import express from 'express';

import { ruleRouter } from './routes/rule';

const app = express();

app.use('/rule', ruleRouter);

export default app;
