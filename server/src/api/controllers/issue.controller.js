import HttpStatus from 'http-status-codes';
import Issue from '../models/issue.model';
import Joi from 'joi';
import fs from 'fs';
// import thumb from 'node-thumbnail';
const thumb = require('node-thumbnail').thumb;

export default {
    findAll(req, res, next) {
        let query = req.query;
        let sortObj = {};
        sortObj[query.sortColumn ? query.sortColumn : 'created'] = query.sortOrder;
        let options = { page: parseInt(query.pageNumber) + 1, limit: parseInt(query.pageSize), sort: sortObj };
        let condition = {};
        if (query.filter) {
            var re = new RegExp(query.filter, 'i');
            condition.$or = [{ 'title': { $regex: re }}, { 'description': { $regex: re }}];
        }
        Issue.paginate(condition, options)
        .then(results => {
            res.json({results: results});
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
            photos: Joi.string().optional(),
            createdBy: Joi.string().required(),
            created: Joi.date().optional(),
            modified: Joi.date().optional()
        });
        const { error, value } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Issue.create(value)
        .then(issue => {
            if (req.body.photos) {
                const photos = JSON.parse(req.body.photos);
                photos.forEach(function(photo, index, arr) {
                    fs.rename('./tmp/uploads/' + photo, './uploads/photos/' + photo, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // Generate thumbnail
                            thumb({
                                source: './uploads/photos/' + photo,
                                destination: './uploads/photos',
                                width: 200
                            }).then(function() {
                                console.log('Success');
                            }).catch(function(e) {
                                console.log('Error', e.toString());
                            });
                        }
                    });
                 })    
            }
            res.json(issue);
        })
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