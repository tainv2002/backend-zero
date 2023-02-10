const db = require("../config/database");

const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM Users");
    return rows;
};

const addUser = async ({ email, name, city }) => {
    await db.query(
        `
            INSERT INTO Users (email, name, city) 
            VALUES (?, ?, ?)
            `,
        [email, name, city]
    );
};

const getUser = async (id) => {
    const [rows] = await db.query("SELECT * FROM Users WHERE id = ?", id);

    return rows && rows.length > 0 ? rows[0] : {};
};

const editUser = async ({ id, email, name, city }) => {
    await db.query(
        "UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?",
        [email, name, city, id]
    );
};

const deleteUser = async (id) => {
    await db.query("DELETE FROM Users WHERE id = ?", [id]);
};

module.exports = {
    getAllUsers,
    addUser,
    getUser,
    editUser,
    deleteUser,
};
