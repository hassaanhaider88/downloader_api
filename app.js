let dotenv = require("dotenv");
let express = require("express");
let cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let { ttdl } = require("btch-downloader");
let { twitterdown } = require("nayan-media-downloader");
let { fbdown } = require("btch-downloader");
const { ytdown } = require("nayan-media-downloader");
var Port = process.env.PORT || 8000

app.get("/", (req, res) => {
  res.send("Your APIs are working. Happy Coding!");
});

app.post("/api/tiktok", async (req, res) => {
  try {
    const url = req.body.url;
    const data = await ttdl(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ mes: "someThing went worng..." });
  }
});

app.post("/api/twitter", async (req, res) => {
  try {
    let URL = await twitterdown(req.body.url);
    res.status(200).json(URL);
  } catch (error) {
    res.status(500).json({ mes: "something went wrong..." });
  }
});

app.post("/api/youtube", async (req, res) => {
  try {
    let URL = await ytdown(req.body.url);
    res.status(200).json(URL);
  } catch (error) {
    res.status(500).json({ mes: "something went wrong..." });
  }
});

app.post("/api/facebook", async (req, res) => {
  console.log(req.body.url);
  try {
    const url = req.body.url;
    const data = await fbdown(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ mes: "someThing went worng..." });
  }
});

app.listen(Port, () => {
  console.log("server is running on",Port);
});

module.exports = app;



