const express = require("express");
const router = express.Router();


const {
    createHostGame,
    getAllHostGames,
    getHostGameById,
    updateHostGameById,
    deleteHostGameById,
    viewFacility,
    viewAllFacility
}
= require("../../controllers/admin/operation/Booking")


router.post('/', createHostGame)
router.get('/', getAllHostGames)
router.get('/hostGameId', getHostGameById)






module.exports = router;