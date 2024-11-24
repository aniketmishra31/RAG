import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/userRouter";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", authRouter);

app.listen(process.env.PORT || 8080,
    () => console.log(`Server started at ${process.env.PORT || 8080}`)
);