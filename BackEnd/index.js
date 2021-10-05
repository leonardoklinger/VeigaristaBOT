const express = require("express");
const { json } = require("express");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const cors = require("cors");
const app = express();
const resultadoUser = require("./comandos/resultadoUser.js")
require("dotenv").config();

const limiter = rateLimit({
    windowMs: 0.6 * 60 * 1000,
    max: 20,
    message: "Espere por 6 segundos, o limite rate da api foi excedida."
});

app.use(limiter);
app.use(cors());
app.use(json());
app.listen(process.env.PORT || 3333);

app.get('/', async (req, res) => {
    res.json({
        message: 'hello world'
    })
})

app.get("/summoner/:summonerName", async (req, res) => {
    const { summonerName } = req.params
    resultadoUser.run(req, res, summonerName, axios, json)
})