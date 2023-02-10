const db = require("../config/database");
const {
    addUser,
    getUser,
    editUser,
    deleteUser,
} = require("../services/CRUDService");

class UserController {
    // [POST] /users/create
    async create(req, res, next) {
        await addUser(req.body);
        res.redirect("/");
    }

    // [GET] /users/create
    add(req, res, next) {
        res.render("createUser");
    }

    // [GET] /users/:id/edit
    async edit(req, res, next) {
        const user = await getUser(req.params.id);
        res.render("editUser", { user });
    }

    // [POST] /users/:id/edit
    async update(req, res, next) {
        await editUser({ ...req.body, id: req.params.id });
        res.redirect("/");
    }

    // [GET] /users/:id/delete
    async delete(req, res, next) {
        const user = await getUser(req.params.id);
        res.render("deleteUser", { user });
    }

    // [POST] /users/:id/delete
    async destroy(req, res, next) {
        await deleteUser(req.params.id);
        res.redirect("/");
    }
}

module.exports = new UserController();
