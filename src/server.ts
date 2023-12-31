import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.status(200);
    res.json({ message: "hello" });
    next();
    // setTimeout(() => {
    //     next(new Error("Something went wrong"));
    // }, 1);
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
    if (err.type === "auth") {
        res.status(401).json({ message: "unauthorized" });
    } else if (err.type === "input") {
        res.status(400).json({ message: "invalid input" });
    } else {
        res.status(500).json({ message: "something went wrong" });
    }
});
export default app;

//ORM -- Object-Relation Mapping -> sdk for db, to interact with DBs so that you dont need to some low level stuff, ex- Prisma client
