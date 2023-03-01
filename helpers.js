const { youtube } = require("scrape-youtube");
const nlp = require("compromise");
const { key18 } = require("./constants");

const fetchYoutubeSearchData = async (searchKey = "") => {
  const options = {
    type: "video",
    request: {
      headers: {
        Cookie: "PREF=f2=8000000",
      },
    },
  };
  const { videos } = await youtube?.search(searchKey, options);
  // cek apakah ada 18+

  const checkKey18 = nlp(searchKey)
    .match(`(${String(key18?.join("|"))})`)
    .out("array");
  if (checkKey18?.length) {
    return [];
  } else {
    const newObjVideos = videos?.map((item) => ({
      ...item,
      srcVideo: `https://www.youtube.com/embed/${item?.id}`,
    }));
    return newObjVideos;
  }
};

const randomHandler = (arrTargetted = []) => {
  return Math.floor(Math.random()) * [arrTargetted]?.length;
};

const keyCorpus = () => {
  const arrKeySearch = ["piano", "relaxing", "funny", "video", ""];

  const randomSearchKeyChoosenInit =
    arrKeySearch?.[randomHandler(arrKeySearch)];

  return randomSearchKeyChoosenInit;
};
module.exports = { fetchYoutubeSearchData, keyCorpus };
