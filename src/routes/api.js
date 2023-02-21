const express = require("express");
const routerAPI = express.Router();
const {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileAPI,
    postUploadMultipleFilesAPI,
} = require("../controllers/apiController");
const customerController = require("../controllers/customerController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/file", postUploadSingleFileAPI);
routerAPI.post("/files", postUploadMultipleFilesAPI);

routerAPI.get("/customers", customerController.all);
routerAPI.put("/customers", customerController.update);
routerAPI.delete("/customers", customerController.delete);
routerAPI.post("/customers", customerController.create);
routerAPI.post("/customers-list", customerController.createArray);
routerAPI.delete("/customers-list", customerController.deleteArray);

routerAPI.post("/projects", projectController.create);
routerAPI.get("/projects", projectController.all);

routerAPI.get("/tasks", taskController.all);
routerAPI.post("/tasks", taskController.create);
routerAPI.delete("/tasks", taskController.delete);
routerAPI.put("/tasks", taskController.update);



module.exports = routerAPI;
