import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const result = await axios.get('http://localhost:3001/get');
                setTodos(result.data);
            } catch (err) {
                console.error('Error fetching todos:', err);
            }
        };
        fetchTodos();
    }, []);

    const handleEdit = async (id) => {
        try {
            await axios.put(`http://localhost:3001/update/${id}`);
            // Refresh the todo list without reloading the page
            const result = await axios.get('http://localhost:3001/get');
            setTodos(result.data);
        } catch (err) {
            console.error('Error updating todo:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/delete/${id}`);
            // Refresh the todo list without reloading the page
            const result = await axios.get('http://localhost:3001/get');
            setTodos(result.data);
        } catch (err) {
            console.error('Error deleting todo:', err);
        }
    };

    return (
        <div>
            <h2>Todo List</h2>
            <Create />
            <br />
            {
                todos.length === 0 ? (
                    <div>
                        <h2>No Record</h2>
                    </div>
                ) : (
                    todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ? <BsFillCheckCircleFill className='icon' /> 
                                : <BsCircleFill className='icon' /> }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default Home;
