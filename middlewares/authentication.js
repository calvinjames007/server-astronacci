const {verifyToken} = require('../helpers/jwt');
const {User} = require('../models');

const authentication = async(req, res, next) => {
    try {
        const {access_token} = req.headers;

        if (!access_token) {
            res.status(401).json({message:`Invalid Token`});
        }

        const userId = verifyToken(access_token);
        const user = await User.findOne({where: {email: userId.email}});

        if (!user) {
            res.status(401).json({message: `Invalid Token`})
        }

        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
}

module.exports = {authentication}