import express from "express";
import { getUri, initDB } from "./utils/mongo";
import router from "./routers";
import session from "express-session";
import { SESSION_SECRET } from "./config/common";
import morgan from "morgan";
import cors from "cors";
import createStore from "connect-mongodb-session";

export async function initApp() {
    await initDB();
    const app = express();

    const MongoDBStore = createStore(session);
    const store = new MongoDBStore({ uri: getUri(), collection: "sessions" });
    store.on("error", (error) => console.log(error));

    app.use(cors({ credentials: true, origin: "*" }));
    app.use(morgan("combined"));
    app.use(express.json());
    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
            store,
        })
    );

    app.use(router);

    return app;
}
