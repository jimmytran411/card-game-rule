import express from "express";
import cors from "cors";
import path from "path";

import mainApp from "./app";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", mainApp);
app.use("/", (req, res) => {
  res.send("Server Running");
});

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'frontend/build')));
// const root = path.join(__dirname, 'frontend', 'build');
// app.use(express.static(root));
// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root });
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

export default app;
