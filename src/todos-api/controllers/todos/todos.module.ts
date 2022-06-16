/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { todoSchema } from 'src/models/schemas/todo.schema';
import { TodoServiceService } from 'src/services/todo-service/todo-service.service';
import { TodosController } from './todos.controller';

@Module({
    controllers: [TodosController],
    imports: [
        MongooseModule.forFeature([{
            name: 'Todo', schema: todoSchema
        }])
    ],
    providers: [TodoServiceService]
})
export class TodosModule {}
