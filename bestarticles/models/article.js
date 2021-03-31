const mgs = require("mongoose");

// const valid_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const valid_pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// const valid_phoneNumber = /^(\+98|0)?9\d{9}$/;
// const check_gender = ["female", "male"];

const essentialSchema = {
  type: String,
};

const ArticleSchema = new mgs.Schema({
  cover: {
    type: String,
    validate(value) {
      if (!value) {
        throw new Error("Please set a photo for cover");
      }
    },
  },
  title: {
    type: String,
    validate(value) {
      if (!value) {
        throw new Error("Your article should be have title");
      }
    },
  },
  content: {
    type: String,
    validate(value) {
      if (value === "<p><br></p>") {
        throw new Error("Your article should be have content");
      }
    },
  },
  viewer: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mgs.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mgs.model("Article", ArticleSchema);
