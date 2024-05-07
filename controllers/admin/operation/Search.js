
// const isAdminUser  = require("../../models/admin_mode/profile")
const Facility = require("../../../models/admin_mode/facilities")
require("dotenv").config()



const serchfacility = async(req, res) => {
    try {
        const {
            facilityname,
            address,
            phonenumber,
            activehours,
            numberofplayer,
            category,
            chargeForFacility,
            sort,
            fields,
            page,
            limit,
            numericFilters
        } = req.query;

        let queryObject = {};

        if (facilityname) {
            queryObject.facilityname = { $regex: new RegExp(facilityname, 'i') };
        }
        if (address) {
            queryObject.address = { $regex: new RegExp(address, 'i') };
        }
        if (phonenumber) {
            queryObject.phonenumber = { $regex: new RegExp(phonenumber, 'i') };
        }

        if (activehours) {
            const { dayOfWeek, openinghours, closinghours } = activehours;
            if (dayOfWeek !== undefined) {
                queryObject['activehours.dayOfWeek'] = dayOfWeek;
            }
            if (openinghours) {
                queryObject['activehours.openinghours'] = openinghours;
            }
            if (closinghours) {
                queryObject['activehours.closinghours'] = closinghours;
            }
        }

        if (numberofplayer) {
            queryObject.numberofplayer = numberofplayer;
        }

        if (category) {
            queryObject.category = { $in: category };
        }

        if (chargeForFacility) {
            const { startGameAt, endAt, price } = chargeForFacility;
            if (startGameAt) {
                queryObject['chargeForFacility.startGameAt'] = startGameAt;
            }
            if (endAt) {
                queryObject['chargeForFacility.endAt'] = endAt;
            }
            if (price) {
                queryObject['chargeForFacility.price'] = price;
            }
        }

        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const filters = numericFilters.split(',').map(item => {
                const [field, operator, value] = item.split('-');
                return { [field]: { [operatorMap[operator]]: Number(value) } };
            });
            queryObject = { ...queryObject, ...Object.assign({}, ...filters) };
        }

        let result = Facility.find(queryObject);

        if (sort) {
            const sortOptions = sort.split(',').join(' ');
            result = result.sort(sortOptions);
        } else {
            result = result.sort({ createdAt: -1 }); // Default sorting by createdAt
        }

        if (fields) {
            const fieldsList = fields.split(',').join(' ');
            result = result.select(fieldsList);
        }

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;

        result = result.skip(skip).limit(pageSize);

        const products = await result;

        res.status(200).json({ products, nbHits: products.length, limit: pageSize });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = {
    serchfacility
}