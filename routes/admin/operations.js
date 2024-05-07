const express = require("express");
const router = express.Router();


const { serchfacility } = require("../../controllers/admin/operation/Search")
const { viewFacility, viewAllFacility } = require("../../controllers/admin/operation/Booking")

router.get('/search', serchfacility)
router.get('/:Id', viewFacility)
router.get('/', viewAllFacility)





module.exports = router;