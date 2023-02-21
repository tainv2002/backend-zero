const db = require("../config/database");
const User = require("../models/user");

class HomeController {
    async index(req, res, next) {
        const users = await User.find({});
        res.render("home", {
            users,
        });
    }
}

module.exports = new HomeController();
