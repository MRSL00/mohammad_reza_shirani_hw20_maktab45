const express = require("express");
const router = express.Router();
const { UploadCover } = require("../tools/general-tools");
const multer = require("multer");

const {
  render_allarticlesPage,
  render_createarticlePage,
  render_myarticlesPage,
  render_showarticlePage,
  postCreateArticle,
} = require("../controllers/article");

router.get("/allarticles", render_allarticlesPage);

router.get("/createarticle", render_createarticlePage);
router.post("/createarticle", UploadCover.single("cover"), postCreateArticle);

router.get("/myarticles", render_myarticlesPage);

router.get("/article/:id", render_showarticlePage);

module.exports = router;
