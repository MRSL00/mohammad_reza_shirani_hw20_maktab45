const Article = require("../models/article");
const { UploadCover } = require("../tools/general-tools");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ################# show all articles ##################
const render_allarticlesPage = async (req, res) => {
  try {
    const articles = await Article.find({}).populate("author", { username: 1 });
    res.render("article/allarticles.ejs", {
      data: req.session.user,
      articles: articles.reverse(),
    });
  } catch (err) {
    console.log(err.message);
  }
};
//################# create new article ######################
const render_createarticlePage = (req, res) => {
  res.render("article/createarticle.ejs", {
    data: req.session.user,
    err: req.flash("err"),
    succ: req.flash("succ"),
  });
};
const postCreateArticle = async (req, res) => {
  if (!req.file) {
    req.flash("err", "Please set a cover for article");
    return res.status(400).redirect("createarticle");
  }
  const newArticle = new Article({
    cover: req.file.filename,
    ...req.body,
    author: req.session.user._id,
  });
  try {
    const article = await newArticle.save();
    req.flash("succ", "Created successfuly");
    return res.status(200).redirect("createarticle");
  } catch (err) {
    const Err = [];

    err.message
      .substr(27)
      .split(",")
      .filter((el) => Err.push(el.split(":")[1].trim()));
    console.log(Err);
    console.log(err.message);
    req.flash("err", Err);

    return res.status(400).redirect("createarticle");
  }
};

// ############### show login user articles ######################
const render_myarticlesPage = async (req, res) => {
  try {
    const articles = await Article.find({
      author: req.session.user._id,
    });

    res.render("article/myarticles.ejs", {
      data: req.session.user,
      articles: articles,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// ###################### read article page ############################
const render_showarticlePage = async (req, res) => {
  try {
    const article = await Article.find({
      _id: req.params.id,
    }).populate("author", { username: 1 });

    res.render("article/showarticle.ejs", {
      data: req.session.user,
      article: article,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  render_allarticlesPage,
  render_createarticlePage,
  render_myarticlesPage,
  render_showarticlePage,
  postCreateArticle,
};
