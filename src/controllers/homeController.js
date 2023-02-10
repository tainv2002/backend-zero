const db = require("../config/database");
const { getAllUsers } = require("../services/CRUDService");

class HomeController {
    async index(req, res, next) {
        const users = await getAllUsers();
        res.render("home", {
            users,
        });
    }
}

module.exports = new HomeController();
