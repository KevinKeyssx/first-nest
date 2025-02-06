import { StatusArgs } from './dto/args/status.args';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        { id: 1, description: 'Piedra del alma', done: false },
        { id: 2, description: 'Piedra del tiempo', done: true },
        { id: 3, description: 'Piedra del espacio', done: false },
        { id: 4, description: 'Piedra del universo', done: true },
        { id: 5, description: 'Piedra del entretenimiento', done: true },
    ];


    get totalTodos(): number {
        return this.todos.length;
    }


    get pendingTodos(): number {
        return this.todos.filter( todo => !todo.done ).length;
    }


    get completeTodos(): number {
        return this.todos.filter( todo => todo.done ).length;
    }


    findAll( { done }: StatusArgs ): Todo[] {
        if ( !done ) return this.todos;
        return this.todos.filter( todo => todo.done === done );
    }

    findOne(id: number): Todo {
        const todo = this.todos.find( todo => todo.id === id );
        if ( !todo ) throw new NotFoundException( `Todo with id ${id} not found` );
        return todo;
    }


    createTodo( createTodoInput: CreateTodoInput ): Todo {
        const newTodo       = new Todo();
        newTodo.id          = Math.max( ...this.todos.map( todo => todo.id ) ) + 1;
        newTodo.description = createTodoInput.description;
        this.todos          = [ ...this.todos, newTodo ];
        return newTodo;
    }


    updateTodo({ id, description, done }: UpdateTodoInput): Todo {
        const currentTodo = this.findOne( id );

        if ( description )          currentTodo.description = description;
        if ( done !== undefined )   currentTodo.done        = done;

        this.todos = this.todos.map( todo => ( todo.id === id ) ? currentTodo : todo );

        return currentTodo;
    }


    deleteTodo( id: number ): Todo {
        const todo = this.findOne( id );
        this.todos = this.todos.filter( todo => todo.id !== id );
        return todo;
    }
}
