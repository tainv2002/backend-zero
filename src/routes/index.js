const webRoutes = require("./web");
const apiRoutes = require("./api");

const routes = (app) => {
    app.use("/", webRoutes);
    app.use("/v1/api/", apiRoutes);
};

module.exports = routes;
