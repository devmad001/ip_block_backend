const express = require("express");
const router = express.Router();

const { updateCountries, updateIps } = require("../controllers/blocks");

router.post("/update-block-ips", updateIps);

router.post("/update-block-countries", updateCountries);

module.exports = router;
