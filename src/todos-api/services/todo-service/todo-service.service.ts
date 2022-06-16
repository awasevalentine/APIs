/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoDto } from 'src/models/dtos/todo.dto';
import { TodoItems } from 'src/models/interface/todo.interface';

@Injectable()
export class TodoServiceService {

    constructor(@InjectModel('Todo')private readonly todoRepo: Model<TodoItems>) { }

  async createTodo(todo: TodoDto): Promise<TodoItems> {
      try {
        const addTodo = await new this.todoRepo(todo);
        return addTodo.save();
      } catch (error) {
          return error
      }

  }


  async getTodos(): Promise<TodoItems[]> {
      try {
            return await this.todoRepo.find().exec();
      } catch (error) {
          return error
      }
  }


  async getTodoById(id: string): Promise<TodoItems> {
      try {
        return await this.todoRepo.findById({_id:id});
      } catch (error) {
         return error
      }
  }

  async getTodoByUserId(id: string): Promise<TodoItems[]> {
      try {
        const userTodos = await this.todoRepo.find({ userId: id });
        return userTodos;
      } catch (error) {
          return error
      }

  }

  async updateTodo(todoId:string, todoData: TodoDto): Promise<TodoItems> {
      try {
            return await this.todoRepo.findByIdAndUpdate({_id: todoId}, todoData);
      } catch (error) {
          return error
      }
  }
  

  
  async deleteTodo(todoId: string): Promise<TodoItems> {
      try {
        return await this.todoRepo.findByIdAndDelete({_id: todoId});
      } catch (error) {
          return error
      }
  }
}
