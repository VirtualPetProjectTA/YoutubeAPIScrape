const express = require("express");

const app = express();

const {
  fetchYoutubeSearchData,
  keyCorpus,
  fetchDetailYoutubeVideos,
  fetchAndResponseHandler,
} = require("./helpers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, response) => {
  fetchAndResponseHandler(fetchYoutubeSearchData(keyCorpus()), response);
});

app.get("/:searchKey", async (req, response) => {
  const searchValue = req?.params?.searchKey;
  fetchAndResponseHandler(fetchYoutubeSearchData(searchValue), response);
});

app.get("/details/:idVideo", async (req, response) => {
  const idVideo = req?.params?.idVideo;
  fetchAndResponseHandler(fetchDetailYoutubeVideos(idVideo), response);
});

app.post("/", async (req, response) => {
  const searchValue = req.body?.searchKey;
  fetchAndResponseHandler(fetchYoutubeSearchData(searchValue), response);
});

app.listen(8888);
