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

    // Manual Login
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
                lastName: user.lastName,
                status: user.status
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    // Google Login
    static async loginUsingGoogle (req, res) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENTID,
            })
            const payloadGoogle = ticket.getPayload();
            const [user] = await User.findOrCreate({
                where: {email: payloadGoogle.email},
                defaults: {
                    email: payloadGoogle.email,
                    firstName: payloadGoogle.name,
                    lastName: payloadGoogle.name,
                    password: '1234'
                },
                hooks: false
            })
            const access_token = signToken({
                id: user.id,
                email:user.email
            })
            res.jason({access_token})
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController