const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { permission } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/roleMenuPermission");

module.exports = api;
