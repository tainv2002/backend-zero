const {
    getTasksService,
    createTaskService,
    deleteTaskService,
    updateTaskService,
} = require("../services/taskService");

class TaskController {
    // [GET] /v1/api/tasks
    async all(req, res) {
        const tasks = await getTasksService(req.query);

        res.status(200).json({
            EC: 0,
            data: tasks,
        });
    }

    // [POST] /v1/api/tasks
    async create(req, res) {
        const task = await createTaskService(req.body);

        res.status(200).json({
            EC: 0,
            data: task,
        });
    }

    // [DEL] /v1/api/tasks
    async delete(req, res) {
        const task = await deleteTaskService(req.body.id);

        res.status(200).json({
            EC: 0,
            data: task,
        });
    }

    // [PUT] /v1/api/tasks
    async update(req, res) {
        const task = await updateTaskService(req.body);

        res.status(200).json({
            EC: 0,
            data: task,
        });
    }
}

module.exports = new TaskController();
