import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo }         from './entity/todo.entity';
import { TodoService }  from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';


@Resolver(() => Todo )
export class TodoResolver {

    constructor(
        private todoService: TodoService
    ) { }

    @Query( () => [Todo], { name: 'todos' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll( statusArgs );
    }

    @Query( () => Todo, { name: 'todo' })
    findOne(
        @Args( 'id', { type: () => Int }) id: number
    ): Todo {
        return this.todoService.findOne( id );
    }


    @Mutation( () => Todo, { name: 'createTodo' })
    createTodo(
        @Args( 'createTodoInput' ) createTodoInput: CreateTodoInput
    ): Todo {
        return this.todoService.createTodo( createTodoInput );
    }


    @Mutation( () => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args( 'updateTodoInput' ) updateTodoInput: UpdateTodoInput
    ): Todo {
        return this.todoService.updateTodo( updateTodoInput );
    }


    @Mutation( () => Todo, { name: 'deleteTodo' })
    deleteTodo(
        @Args( 'id', { type: () => Int } ) id: number
    ): Todo {
        return this.todoService.deleteTodo( id );
    }

    @Query( () => Int, { name: 'totalTodos' })
    totalTodos(): number {
        return this.todoService.totalTodos;
    }


    @Query( () => Int, { name: 'pendingTodos' })
    pendingTodos(): number {
        return this.todoService.pendingTodos;
    }


    @Query( () => Int, { name: 'completeTodos' })
    completeTodos(): number {
        return this.todoService.completeTodos;
    }


    @Query( () => AggregationsType, { name: 'aggregations' })
    aggregations(): AggregationsType {
        return {
            total       : this.todoService.totalTodos,
            pending     : this.todoService.pendingTodos,
            complete    : this.todoService.completeTodos,
            totalTodos  : this.todoService.totalTodos
        }
    }
}
