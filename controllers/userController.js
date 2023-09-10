const {User} = require('../models');
const bcrypt = require('bcryptjs');
const {signToken} = require('../helpers/jwt');

class userController {
    static async register(req, res) {
        try {
            const {email, firstName, lastName, password} = req.body
            const newRegister = await User.create({email, firstName, lastName, password, status : 'Regular'})
            res.status(201).json({message: `New user ${newRegister.firstName} ${newRegister.lastName} has been created`})
        }
        catch (error) {
            console.log(error, "<<<<< ini dari error Register")
        }
    }

    static async login(req, res) {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                return res.status(400).json({message: `Please enter your email and password`})
            }

            const [user] = await User.findAll({where: {email}})

            if (!user) {
                return res.status(400).json({message: `Email not found`})
            }

            const isValidPass = bcrypt.compareSync(password, user.password);

            if (!isValidPass) {
                return res.status(401).json({message: `Email or Password is inccorect`})
            }

            const accessToken = signToken({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                status: user.status
            })

            res.json({
                accessToken,
                firstName: user.firstName,
                lastName: user.lastName
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController