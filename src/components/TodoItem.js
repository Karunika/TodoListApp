import React from "react";

const TodoItem = ({ todo: {id, title, completed}, delTodo, toggleCompleted }) => {
    const changeHandler = (e) => {
        toggleCompleted(id);
        e.target.nextElementSibling.style.textDecoration = completed ? "none" : "line-through" ;
    }
    return (
        <div className="todo-item">
            <input type="checkbox" onChange={changeHandler}></input>
            <span>{title}</span>
            <button onClick={() => delTodo(id)}>Delete</button>
        </div>
    )
}

export default TodoItem;