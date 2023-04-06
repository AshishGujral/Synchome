
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from 'url';
import Connection from "./database/db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import apiRouter from "./routes/routes.js";
import multer from "multer";

dotenv.config();

const app = express();

app.use(express.json()); // send any json file/object
app.use(cors());

// linking images to posts: using path and url module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "/images")))

const storage = multer.diskStorage({ // store file in images folder, use the filename given by the user 
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// for userProfilePic
const upload = multer({storage:storage});
app.post("/backend/upload", upload.single("file"),(req, res)=>{
    res.status(200).json("file is uploaded");
})

app.use("/backend/auth", authRouter);
app.use("/backend/users", userRouter);
app.use("/backend/routes", apiRouter);

app.listen("3000", () => {
  console.log("server is running");
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.PASSWORD;
Connection(USERNAME, PASSWORD);
