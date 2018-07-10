import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const IssueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    responsible: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Open'
    },
    deadline: {
        type: Date,
    },
    createdBy: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    modified: {
        type: Date,
        default: null
    }
});
export default mongoose.model('Issue', IssueSchema);