const aqp = require("api-query-params");
const Project = require("../models/project");
const User = require("../models/user");
const Task = require("../models/task");

const createProjectService = async (data) => {
    try {
        switch (data.type) {
            case "EMPTY_PROJECT":
                return await Project.create(data);
            case "ADD_USERS":
                const projectAddUsers = await Project.findById(data.projectId);
                for (let i = 0; i < data.usersArr.length; i++) {
                    const user = await User.findById(data.usersArr[i]);
                    if (!user) throw new Error("User does not exist");
                }

                projectAddUsers.usersInfor = data.usersArr;

                return await projectAddUsers.save();
            case "ADD_TASKS":
                const projectAddTasks = await Project.findById(data.projectId);
                for (let i = 0; i < data.tasks.length; i++) {
                    const user = await Task.findById(data.tasks[i]);
                    if (!user) throw new Error("Task does not exist");
                }

                projectAddTasks.tasks = data.tasks;

                return await projectAddTasks.save();
            case "DELETE_USERS":
                const projectDeleteUsers = await Project.findById(
                    data.projectId
                );
                for (let i = 0; i < data.usersArr.length; i++) {
                    projectDeleteUsers.usersInfor.pull(data.usersArr[i]);
                }

                return await projectDeleteUsers.save();
            default:
                return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getProjectsService = async (query) => {
    try {
        const { limit, filter: filters, population } = aqp(query);
        const { page, ...filter } = filters;
        const skip = (page - 1) * limit;

        return await Project.find(filter)
            .populate(population)
            .limit(limit)
            .skip(skip);
    } catch (err) {
        console.log(err);
        return null;
    }
};

module.exports = {
    createProjectService,
    getProjectsService,
};
