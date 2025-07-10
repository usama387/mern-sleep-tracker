import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";

// App Config
const app = express();

// to access environment variables in .env file
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());

// Allow ALL origins
const allowedOrigins = [
  process.env.PRODUCTION, // Production from env
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["set-cookie"],
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// test api end point
app.get("/", (req, res) => {
  res.send("Somnio backend is running successfully...");
});


// user api end point
app.use("/api/user", userRouter)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The backend is up on port ${port}`);
});