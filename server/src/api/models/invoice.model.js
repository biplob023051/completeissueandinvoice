import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const InvoiceSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    rate: {
        type: Number,
        required: false
    },
    tax: {
        type: Number,
        required: false
    }
});
export default mongoose.model('Invoice', InvoiceSchema);