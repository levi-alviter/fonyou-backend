const express = require("express");

const router = express.Router();

const charactersRoutes = require("../controllers/characters-controller");

router.get("/:id", charactersRoutes.getSingleCharacterById);
router.get("/name/:name",charactersRoutes.getCharacterByName);

module.exports = router;