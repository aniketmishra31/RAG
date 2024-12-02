import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/userRouter";
import documentRouter from "./routes/documentRouter";
dotenv.config();

const app = express();
app.use(cors({
    origin: "https://rag-liard.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-apiKey"],
    credentials: true,
}));

app.options("*", cors());

app.use(express.json());

app.use("/api", authRouter);
app.use("/api", documentRouter)

app.listen(process.env.PORT || 8080,
    () => console.log(`Server started at ${process.env.PORT || 8080}`)
);