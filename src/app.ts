import express from "express";
import { initDB } from "./utils/mongo";
import router from "./routers";
import session from "express-session";
import { SESSION_SECRET } from "./config/common";
import morgan from "morgan";
import cors from "cors";

export async function initApp() {
    await initDB();
    const app = express();

    app.use(cors());
    app.use(morgan("combined"));
    app.use(express.json());
    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
        })
    );

    app.use(router);

    return app;
}
