const aqp = require("api-query-params");
const Task = require("../models/task");

module.exports = {
    getTasksService: async function (query) {
        try {
            const { limit, filter: filters } = aqp(query);
            const { page, ...filter } = filters;
            const skip = (page - 1) * limit;

            return await Task.find(filter).limit(limit).skip(skip);
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    createTaskService: async function (data) {
        try {
            return await Task.create(data);
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    deleteTaskService: async function (id) {
        try {
            const task = await Task.findById(id);
            await task.delete();
            return task;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    updateTaskService: async function (data) {
        try {
            return await Task.findByIdAndUpdate(data.id, data );
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};
