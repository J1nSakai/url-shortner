import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongodb.config.js";
import authRouter from "./src/routes/auth.routes.js";
import shorturlRouter from "./src/routes/shorturl.route.js";
import { redirectFromShorturl } from "./src/controllers/shorturl.controller.js";
import { errorHandler } from "./middleware/appError.js";
import cors from "cors";
import { attachUser } from "./middleware/attachUser.js";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config("./.env");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

app.get("/", (req, res) => {
  res.send(nanoid(6));
});

app.use("/api/auth", authRouter);

app.use("/api/create", shorturlRouter);

app.use("/api/user", userRoutes);

app.get("/:id", redirectFromShorturl);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server running on http://localhost:3000");
});
