const responseHandler = require("../../response_handler");

const services = require("./course.services");

exports.getList = async (req, res, next) => {
    try {
        const list =  await services.getList(req.query);
        next(responseHandler.success(list));
    } catch (e) {
        next(e);
    }
}