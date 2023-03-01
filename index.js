const express = require("express");

const app = express();

const { fetchYoutubeSearchData, keyCorpus } = require("./helpers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const videoLists = await fetchYoutubeSearchData(keyCorpus());
  res?.send(videoLists);
});

app.get("/:searchKey", async (req, res) => {
  const searchValue = req?.params?.searchKey;
  const videoBasedOnSearch = await fetchYoutubeSearchData(searchValue);
  res?.send(videoBasedOnSearch);
});
app.post("/", async (req, res) => {
  const searchValue = req.body?.searchKey;
  const videoBasedOnSearch = await fetchYoutubeSearchData(searchValue);
  res?.send(videoBasedOnSearch);
});

app.listen(8888);
