import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/pages/About";
import Header from "./components/layout/Header";
import TodoList from "./components/Todolist";
import AddTodoForm from "./components/AddTodoForm";

class App extends Component {
    state = {
        todos: [
            {
                id: Math.random(),
                title: "Go to the market",
                completed: false
            },
            {
                id: Math.random(),
                title: "Hangout with friends",
                completed: false
            },
            {
                id: Math.random(),
                title: "Create a react project",
                completed: false
            }
        ]
    }
    // Add todo
    addTodo = (title) => {
        const newTodo = {
            id: Math.random(),
            title,
            completed: false
        }
        const todos = [...this.state.todos, newTodo]
        this.setState({todos});
    }
    // Delete Todo
    delTodo = (id) => {
        const todos = [...this.state.todos.filter(todo => (
            todo.id !== id
        ))]
        this.setState({todos});
    }
    // Toggle Completed Todo
    toggleCompleted = (id) => {
        const todos = [...this.state.todos.map(todo => {
            if(todo.id === id) todo.completed = !todo.completed;
            return todo;
        })]
        this.setState({todos});
    }
    render() {
        return (
            <div className="app">
                <Router>
                    <Header />
                    <Route path="/" exact render={() => (
                        <React.Fragment>
                            <br />
                            <AddTodoForm addTodo={this.addTodo}/>
                            <br />
                            <TodoList todos={this.state.todos} delTodo={this.delTodo} toggleCompleted={this.toggleCompleted}/>
                        </React.Fragment>
                    )} />
                    <Route path="/about" component={About} />
                </Router>
            </div>
        )
    }
}
export default App;