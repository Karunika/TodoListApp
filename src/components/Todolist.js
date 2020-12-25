import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, delTodo, toggleCompleted }) => {

    return (
        <div className="todo-list-container">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} delTodo={delTodo} toggleCompleted={toggleCompleted}/>
            ))}
        </div>
    )
}

export default TodoList;