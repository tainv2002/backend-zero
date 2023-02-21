const {
    createProjectService,
    getProjectsService,
} = require("../services/projectService");

class ProjectController {
    // [POST] /v1/api/projects
    async create(req, res) {
        const project = await createProjectService(req.body);

        res.status(200).json({
            EC: 0,
            data: project,
        });
    }

    // [GET] /v1/api/projects
    async all(req, res) {
        const project = await getProjectsService(req.query);

        res.status(200).json({
            EC: 0,
            data: project,
        });
    }
}

module.exports = new ProjectController();
