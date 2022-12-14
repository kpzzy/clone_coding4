import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
//

import postRoutes from "./routes/post-route.js";

import { sequelize } from "./models/index.js";

const app = express();

app.set("port", process.env.PORT || 3000);
sequelize
  .sync({ force: false })
  .then(() => console.log("db connect"))
  .catch(err => console.error(err));

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/post", postRoutes);

app.use((req, res, next) => {
  const error = new Error(`메서드 ${req.method} 경로 ${req.url} 존재하지 않습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  return res.json({
    success: false,
    message: err.message,
    result: err,
  });
});

app.listen(app.get("port"), () => console.log(3000));
