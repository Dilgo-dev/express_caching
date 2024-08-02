import express from "express";
import { PORT } from "./utils/env.js";

const app = express();

app.get("/", (_, res) => {
    setTimeout(() => {
        res.status(200).send("🦅🏋");
    }, 2000);
});

app.listen(PORT, () => {
    console.info(`Server listening on port http://localhost:${PORT}/`);
});
