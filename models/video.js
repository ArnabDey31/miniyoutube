const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  theme: {
    type: String,
    required: true,
  },
  videoDetails: [
    {
      videoId: {
        type: String,
        required: true,
      },
      publishedAt: {
        type: Date,
        required: true,
      },
      channelId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      channelTitle: {
        type: String,
        required: true,
      },
    },
  ],
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
