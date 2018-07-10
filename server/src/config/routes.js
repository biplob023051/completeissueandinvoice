import express from 'express';
import invoiceController from '../api/controllers/invoice.controller';
import issueController from '../api/controllers/issue.controller';

export const router = express.Router();

// Invoice routes
router.get('/invoices', invoiceController.findAll);
router.post('/invoices', invoiceController.create);
router.get('/invoices/:id', invoiceController.findOne);
router.delete('/invoices/:id', invoiceController.delete);
router.put('/invoices/:id', invoiceController.update);

// Issues routes
router.get('/issues', issueController.findAll);
router.post('/issues', issueController.create);
router.get('/issues/:id', issueController.findOne);
router.delete('/issues/:id', issueController.delete);
router.put('/issues/:id', issueController.update);