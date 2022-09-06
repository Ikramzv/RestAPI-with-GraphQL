import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Not Started' ,'Progress' , 'Completed']
    },
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: 'Client'
    }
})

export default mongoose.model('project' , projectSchema , 'projects')