const Facility = require("../../../models/admin_mode/facilities")
const HostGAME = require("../../../models/user_model.js/hostgames")
const User = require("../../../models/user_model.js/profile")
require("dotenv").config()


// viewfacility by id 
const viewFacility = async (req, res) => {
    try {
        const { Id } = req.params;

        const facility = await Facility.findById(Id).select('-password -_id');

        if (!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }

        res.status(200).json(facility);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// view facility 
const viewAllFacility = async (req, res) => {
    try {
        const facility = await Facility.find().select('-password -_id');
        if (!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.status(200).json(facility);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const createHostGame = async (req, res) => {
    try {
        const { hostedfacility, numberofplayers, hostby, datetoplay, timetoplay, recurrentbooking } = req.body;
        // Check if the host user exists
        const hostUser = await User.findById(hostby);
        if (!hostUser) {
            return res.status(401).json({ msg: "Oops! To host a game, you need to create an account." });
        }
        // Create a new host game object
        const newGame = new HostGAME({
            hostedfacility,
            numberofplayers,
            hostby,
            datetoplay,
            timetoplay,
            recurrentbooking
        });
        // Save the new game
        await newGame.save();
        // Update the associated facility's bookings
        const facility = await Facility.findById(hostedfacility);
        if (!facility) {
            return res.status(404).json({ msg: "Facility not found" });
        }
        facility.Bookings.push(newGame._id);
        await facility.save();
        res.status(201).json(newGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Controller to get all host games
const getAllHostGames = async (req, res) => {
    try {
        const hostGames = await HostGAME.find().populate('hostedfacility hostby datetoplay timetoplay numberofplayers').select('-__v');
        res.status(200).json({msg:hostGames, 
                                total: hostGames.length || 0

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get a single host game by ID
const getHostGameById = async (req, res) => {
    try {
        const { hostGameId } = req.params;
        const hostGame = await HostGAME.findById(hostGameId).populate('hostedfacility hostby datetoplay timetoplay numberofplayers teams').select('-__v');
        if (!hostGame) {
            return res.status(404).json({ message: 'Host game not found' });
        }
        res.status(200).json(hostGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to update a host game by ID
const updateHostGameById = async (req, res) => {
    try {
        const { hostGameId } = req.params;
        const updatedHostGame = await HostGAME.findByIdAndUpdate(hostGameId, req.body, { new: true }).select('-__v');
        if (!updatedHostGame) {
            return res.status(404).json({ message: 'Host game not found' });
        }
        res.status(200).json(updatedHostGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to delete a host game by ID
const deleteHostGameById = async (req, res) => {
    try {
        const { hostGameId } = req.params;
        const deletedHostGame = await HostGAME.findByIdAndDelete(hostGameId);
        if (!deletedHostGame) {
            return res.status(404).json({ message: 'Host game not found' });
        }
        res.status(200).json({ message: 'Host game deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createHostGame,
    getAllHostGames,
    getHostGameById,
    updateHostGameById,
    deleteHostGameById,
    viewFacility,
    viewAllFacility
    
};
