import HttpStatus from 'http-status-codes';
import Joi from 'joi';
import Invoice from "../models/invoice.model";

export default {
    findAll(req, res, next) {
        Invoice.find()
        .then(invoices => res.json(invoices))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    create(req, res, next) {
        const schema = Joi.object().keys({
            item: Joi.string().required(),
            qty: Joi.number().integer().required(),
            date: Joi.date().required(),
            due: Joi.date().required(),
            rate: Joi.number().optional(),
            tax: Joi.number().optional()
        });
        const { error, value } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Invoice.create(value)
         .then(invoice => res.json(invoice))
         .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    findOne(req, res) {
        let { id } = req.params;
        Invoice.findById(id)
        .then(invoice => {
            if (!invoice) {
                return res.status(HttpStatus.NOT_FOUND).json({err: 'Invoice could not found'});
            }
            res.json(invoice);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    delete(req, res) {
        let { id } = req.params;
        Invoice.findByIdAndRemove(id)
        .then(invoice => {
            if (!invoice) {
                return res.status(HttpStatus.NOT_FOUND).json({err: 'Invoice could not found'});
            }
            res.json(invoice);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    update(req, res) {
        let { id } = req.params;
        const schema = Joi.object().keys({
            item: Joi.string().optional(),
            qty: Joi.number().integer().optional(),
            date: Joi.date().optional(),
            due: Joi.date().optional(),
            rate: Joi.number().optional(),
            tax: Joi.number().optional()
        });
        const { error, value } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Invoice.findOneAndUpdate({_id: id}, value, {new: true})
        .then(invoice => {
            if (!invoice) {
                return res.status(HttpStatus.NOT_FOUND).json({err: 'Invoice could not found'});
            }
            res.json(invoice);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    }
}