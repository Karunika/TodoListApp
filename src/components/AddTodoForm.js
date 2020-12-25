import React, { useState } from "react";

const AddTodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        addTodo(title);
        setTitle('');
    }
    return (
        <form onSubmit={submitHandler}>
            <input type="text" onChange={e => setTitle(e.target.value)} value={title}></input>
            <button>Add todo</button>
        </form>
    )
}
export default AddTodoForm;