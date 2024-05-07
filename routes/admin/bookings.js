const express = require("express");
const router = express.Router();


const { createHostGame } = require("../../controllers/admin/operation/Booking")


router.post('/', createHostGame)





module.exports = router;