const express = require("express");
const getLiveByCountry = require("../controllers/livebycountry");

router = express.Router();
router.post("/live/country", getLiveByCountry);
module.exports = router;
