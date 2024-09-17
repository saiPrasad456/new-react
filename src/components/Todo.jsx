

import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todoitems from './Todoitems';

const Todo = () => {
    const [todolist, setTodolist] = useState(
        localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    );
    const inputRef = useRef(null);

    const add = () => {
        const inputText = inputRef.current?.value.trim();

        if (inputText === "") {
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };

        setTodolist((prev) => [...prev, newTodo]);
        inputRef.current.value = ""; // Clear the input field
    };

    const deleteTodo = (id) => {
        setTodolist((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggle = (id) => {
        setTodolist((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todolist));
    }, [todolist]);

    return (
        <div className="bg-yellow-50 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg">
            <div className='flex items-center mt-7 gap-2'>
                <img className="w-8" src={todo_icon} alt="Todo Icon" />
                <h1 className='text-4xl font-semibold text-blue-800'>ToDo List</h1>
            </div>

            <div className='flex items-center my-7 bg-white rounded-full shadow-md'>
                <input
                    ref={inputRef}
                    className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-gray-500 text-gray-700"
                    type="text"
                    placeholder='Add task'
                />
                <button
                    onClick={add}
                    className='border-none rounded-full bg-blue-600 w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition'
                >
                    ADD +
                </button>
            </div>

            <div>
                {todolist.map((item) => (
                    <Todoitems 
                        key={item.id} // Use id as key for better performance
                        text={item.text} 
                        id={item.id}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo} 
                        toggle={toggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;



