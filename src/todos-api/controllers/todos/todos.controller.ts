/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { TodoDto } from 'src/models/dtos/todo.dto';
import { TodoItems } from 'src/models/interface/todo.interface';
import { TodoServiceService } from 'src/services/todo-service/todo-service.service';

@Controller('api/todos')
export class TodosController {

    constructor(private _todoService: TodoServiceService){}
    
  @Post('/createTodo')
  async createTodo(@Body() todoDto: TodoDto, @Res() res): Promise<TodoItems[]> {
    if (!todoDto.userId)
      return res.json('please specify a user id for this todo', 400);
    await this._todoService.createTodo(todoDto);
    return res.json(`'Todo was successfully created!`, 200);
  }

  
  @Get('/getTodos')
  async getAllTodos(@Res() res ): Promise<TodoItems[]> {
    const data = await this._todoService.getTodos();
    return res.json(data, 200);
  }


  @Get('/userId/:id')
  async  getTodosByUserId(@Res() res, @Param('id') id: string): Promise<TodoItems> {
    const todoById = await this._todoService.getTodoByUserId(id);
    if(!todoById) {
      throw new NotFoundException(`Todo with id = ${id} not found! `);
    }
    return res.json(todoById, 200);
  }

  @Get('/getTodo/:id')
  async getTodoById(@Res() res, @Param('id') id: string): Promise<TodoItems> {
    const todoById = await this._todoService.getTodoById(id);
    if(!todoById) {
      throw new NotFoundException(`Todo with id = ${id} not found! `);
    }
    return res.json(todoById, 200);
  }


  @Put('/updateTodo/:id')

  async updateTodoById(@Res() res, @Param('id') id:string, @Body() todoDto: TodoDto ): Promise<TodoItems> {
    const todo = await this._todoService.updateTodo(id, todoDto);
    if(!todo){ 
      throw new NotFoundException(`Todo with id = ${id} not found! ` )
    }
    return res.json(`Todo with id = ${id}, is successfully updated!`, 200);
  }

  @Delete('/deleteTodo/:id')

  async deleteTodoById(@Res() res, @Param('id') id:string ): Promise<TodoItems> {
    const todo = await this._todoService.deleteTodo(id);
    if(!todo){
      throw new NotFoundException(`Todo with id = ${id} not found!`)
    }
    return res.json(`Todo with id = ${id}, is successfully deleted`);
  }
}
