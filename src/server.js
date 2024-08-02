import express from "express";
import { PORT } from "./utils/env.js";
import cacheMiddleware from "./middleware/cache.middleware.js";

const app = express();

app.get("/", cacheMiddleware(4000), (_, res) => {
    setTimeout(() => {
        res.status(200).send("🦅🏋");
    }, 2000);
});

app.listen(PORT, () => {
    console.info(`Server listening on port http://localhost:${PORT}/ 🦅🏋`);
});
