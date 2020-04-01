const express = require("express");
const getLiveByCountry = require("../controllers/livebycountry");

router = express.Router();
router.get("/live/country", getLiveByCountry);
module.exports = router;
