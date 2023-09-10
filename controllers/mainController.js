const {Video} = require('../models');

class mainController {
    static async getTheVideo(req, res, next) {
        try {
            const status = req.user.status
            let limit = 0;
            
            if (status === "Regular") {
                limit = 3;
            }
            
            if (status === "Premium") {
                limit = 10;
            }

            if (limit === 0) {
                limit = null;
            }

            let options = {};

            if (limit !== null) {
                options.limit = limit;
            }

            const dataVideo = await Video.findAll(options)
            res.status(201).json(dataVideo);
        }
        catch (error) {
            res.status(500).json({message: `Internal Server Error`})
        }
    }
}

module.exports = mainController