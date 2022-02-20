const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const mongoose = require("mongoose");
const Video = require("./models/video");

const cors = require("cors");

const app = express();

const API_KEY = process.env.API_KEY;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 3001);

app.use(morgan("dev"));
app.use(cors());

app.get("/videos/:theme", (req, res) => {
  Video.countDocuments({ theme: req.params.theme }, (err, count) => {
    if (count > 0) {
      Video.findOne({ theme: req.params.theme })
        .then((data) => res.send(data))
        .catch((err) => res.send({ err: "Error occured" }));
    } else {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&type=video&maxResults=10&q=${req.params.theme}`
        )
        .then((response) => {
          console.log(response.data);
          const nvideos = [];
          response.data.items.map((video) => {
            const nv = {
              videoId: video.id.videoId,
              publishedAt: new Date(video.snippet.publishedAt),
              channelId: video.snippet.channelId,
              title: video.snippet.title,
              description: video.snippet.description,
              channelTitle: video.snippet.channelTitle,
            };
            nvideos.push(nv);
          });
          const sortednvideos = nvideos.sort(
            (a, b) => b.publishedAt - a.publishedAt
          );
          const themeVideo = new Video({
            theme: req.params.theme,
            videoDetails: sortednvideos,
          });
          themeVideo
            .save()
            .then((result) => res.send(result))
            .catch((err) => res.send({ err: "Error occured" }));
        })
        .catch((err) => console.log(err));
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("youtube-search-client/build"));
}
