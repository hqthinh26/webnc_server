const _ = require("lodash");
const Joi = require('joi');
const services = require('./feedback.services');
const moment = require("moment");
const responseHandler = require("../../response_handler");

exports.getFeedBackByCourseID = async (req, res, next) => {
    try {
        const schema = Joi.object({
            course_id: Joi.number().required(),
        }).validate(req.query);
        if (schema.error) return next(responseHandler.validationError(schema.error));

        let feedback = await services.getFeedBackByCourseID(schema.value);
        feedback = feedback.map(fb => ({...fb, vn_updated_at: moment(fb.updated_at).format('DD-MM-YYYY')}))
        next(responseHandler.success(feedback));
    } catch (e) {
        next(e);
    }
}