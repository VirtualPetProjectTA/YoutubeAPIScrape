const { youtube } = require("scrape-youtube");
const nlp = require("compromise");
const { key18 } = require("./constants");
const ytdl = require("ytdl-core");

const responseTemplate = ({ response, result, status, message }) => {
  console.log("respon : ", response);
  if (status === 200) {
    return response.send({
      status,
      data: result,
      message: "Successfully get the datas",
    });
  } else {
    return response?.send({ status, data: result, message });
  }
};

const fetchDetailYoutubeVideos = async (link) => {
  const details = await ytdl.getInfo(link);
  return details;
};

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

const fetchAndResponseHandler = (asyncFunctions, response) => {
  return asyncFunctions
    .then((result) => {
      responseTemplate({
        response,
        result,
        status: 200,
      });
    })
    .catch((e) => {
      responseTemplate({
        response,
        result: e,
        status: 400,
      });
    });
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
module.exports = {
  fetchYoutubeSearchData,
  keyCorpus,
  fetchDetailYoutubeVideos,
  fetchAndResponseHandler,
};
