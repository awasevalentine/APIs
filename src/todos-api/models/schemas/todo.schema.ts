/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
    },
    important: {
        type: Boolean
    },
    status: {
        type: Boolean
    },
    userId: {
        type: String,
        required:true
    }

})