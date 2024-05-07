const VisaCard = require('../../../models/admin_mode/card');

// Controller to create a new Visa card
const createVisaCard = async (req, res) => {
    try {
        const newVisaCard = await VisaCard.create(req.body);
        res.status(201).json(newVisaCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get all Visa cards
const getAllVisaCards = async (req, res) => {
    try {
        const visaCards = await VisaCard.find().select('-pin');
        res.status(200).json(visaCards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get a single Visa card by ID
const getVisaCardById = async (req, res) => {
    try {
        const { visaCardId } = req.params;
        const visaCard = await VisaCard.findById(visaCardId).select('-pin');
        if (!visaCard) {
            return res.status(404).json({ message: 'Visa card not found' });
        }
        res.status(200).json(visaCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to update a Visa card by ID
const updateVisaCardById = async (req, res) => {
    try {
        const { visaCardId } = req.params;
        const updatedVisaCard = await VisaCard.findByIdAndUpdate(visaCardId, req.body, { new: true }).select('-pin');
        if (!updatedVisaCard) {
            return res.status(404).json({ message: 'Visa card not found' });
        }
        res.status(200).json(updatedVisaCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to delete a Visa card by ID
const deleteVisaCardById = async (req, res) => {
    try {
        const { visaCardId } = req.params;
        const deletedVisaCard = await VisaCard.findByIdAndDelete(visaCardId);
        if (!deletedVisaCard) {
            return res.status(404).json({ message: 'Visa card not found' });
        }
        res.status(200).json({ message: 'Visa card deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createVisaCard,
    getAllVisaCards,
    getVisaCardById,
    updateVisaCardById,
    deleteVisaCardById
};
