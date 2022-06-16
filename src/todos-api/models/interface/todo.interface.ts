/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';


export interface TodoItems extends Document {
    readonly title: string;
    readonly description: string;
    readonly startDate: Date;
    readonly dueDate: Date;
    readonly important?: boolean;
    readonly status?: boolean;
    readonly userId: string;
}