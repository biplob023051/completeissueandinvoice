import HttpStatus from 'http-status-codes';
import Issue from '../models/issue.model';
import Joi from 'joi';


export default {
    findAll(req, res, next) {
        Issue.find()
        .then(issues => {
            res.json(issues);
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    create(req, res, next) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            responsible: Joi.string().optional(),
            description: Joi.string().required(),
            severity: Joi.string().required(),
            status: Joi.string().optional(),
            deadline: Joi.date().optional(),
            createdBy: Joi.string().required(),
            created: Joi.date().optional(),
            modified: Joi.date().optional()
        });
        const { error, value } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Issue.create(value)
        .then(issue => res.json(issue))
        .catch(err => res.status(INTERNAL_SERVER_ERROR).json(err));
    },
    findOne(req, res, next) {
        let { id } = req.params;
        Issue.findById(id)
        .then(issue => {
            if (!issue) {
                return res.status(HttpStatus.NOT_FOUND).json({err: 'Issue could not found'});
            }
            res.json(issue);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    delete(req, res, next) {
        let { id } = req.params;
        Issue.findByIdAndRemove(id)
        .then(issue => {
            if (!issue) {
                return res.status(HttpStatus.NOT_FOUND).json({err: 'Issue could not found'});
            }
            res.json(issue);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    update(req, res, next) {
        let { id } = req.params;
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            responsible: Joi.string().optional(),
            description: Joi.string().required(),
            severity: Joi.string().required(),
            status: Joi.string().optional(),
            deadline: Joi.date().optional(),
            createdBy: Joi.string().required(),
            created: Joi.date().optional(),
            modified: Joi.date().optional()
        });
        const { error, value } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Issue.findOneAndUpdate({_id: id}, value, {new: true})
        .then(issue => {
            if (!issue) {
                return res.status(HttpStatus.NOT_FOUND).json({err: 'Issue could not found'});
            }
            res.json(issue);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    }
}