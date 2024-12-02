import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/userRouter";
import documentRouter from "./routes/documentRouter";
dotenv.config();

const app = express();
app.use(cors({
    origin: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-apiKey"]
}));
app.options("*", cors({
    origin: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-apiKey"]
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://rag-liard.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-apiKey');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());

app.use("/api", authRouter);
app.use("/api", documentRouter)

app.listen(process.env.PORT || 8080,
    () => console.log(`Server started at ${process.env.PORT || 8080}`)
);