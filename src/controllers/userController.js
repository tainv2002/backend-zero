const User = require("../models/user");

class UserController {
    // [POST] /users/create
    async create(req, res, next) {
        await User.create({
            email: req.body.email,
            name: req.body.name,
            city: req.body.city,
        });
        res.redirect("/");
    }

    // [GET] /users/create
    add(req, res, next) {
        res.render("createUser");
    }

    // [GET] /users/:id/edit
    async edit(req, res, next) {
        const user = await User.findById(req.params.id);
        res.render("editUser", { user });
    }

    // [POST] /users/:id/edit
    async update(req, res, next) {
        await User.findByIdAndUpdate(req.params.id, {
            email: req.body.email,
            name: req.body.name,
            city: req.body.city,
        });
        res.redirect("/");
    }

    // [GET] /users/:id/delete
    async delete(req, res, next) {
        const user = await User.findById(req.params.id);
        res.render("deleteUser", { user });
    }

    // [POST] /users/:id/delete
    async destroy(req, res, next) {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/");
    }
}

module.exports = new UserController();
