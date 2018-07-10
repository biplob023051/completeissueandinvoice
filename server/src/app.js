import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import { router } from './config/routes';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017')

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Logger middleware to log 
app.use(logger('dev'));
app.use('/api', router);
// Router error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    error.message = 'Invalid route';
    next(error);
});
// Error middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({message: error.message});
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));