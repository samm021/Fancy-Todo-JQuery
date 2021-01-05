const { comparePass } = require('../helpers/bcrypt');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

class UserController {

    static registerPost = (req, res, next) => {
        const { email, name, password } = req.body;
        User.create({email, name, password })
        .then(output => res.status(201).json({id: output.id, email: output.email}))
        .catch(err => err ? next(err) : next({name:'InternalServerError'}));
    }
    
    static loginPost = (req, res, next) => {
        const { email, password } = req.body;
        User.findOne({where: {email}})
        .then(output => {
            if (output) {
                if (comparePass(password, output.password)) {
                    const access_token = generateToken({
                        id: output.id,
                        name: output.name,
                        email: output.email
                    })
                    res.status(200).json({access_token})
                } else {
                    throw {name:'InvalidInput'}
                }
            } else {
                throw {name:'InvalidInput'}
            }
        })
        .catch(err => {
            if (err) {
                next(err)
            } else {
                next({name:'InternalServerError'})
            }
        })
    }
}

module.exports = UserController;