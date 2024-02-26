import React, { useState, useEffect } from 'react';

export default function Todolist() {
    const [todos, setTodos] = useState([]);
    const [openform, setOpenform] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const handleAddButtonClick = () => {
        setEditingIndex(null);
        setOpenform(true);
    };

    const handleCloseButtonClick = () => {
        setTitle('');
        setDesc('');
        setOpenform(false);
    };

    const addTodos = () => {
        const updatedTodos = [...todos];

        if (title && desc) {
            const newTodo = {
                id: todos.length + 1,
                title,
                description: desc,
                status: false,
            };

            if (editingIndex !== null) {
                updatedTodos[editingIndex] = newTodo;
            } else {
                updatedTodos.push(newTodo);
            }

            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }

        setTitle('');
        setDesc('');
        setEditingIndex(null);
        setOpenform(false);
        console.log(updatedTodos)
    };

    const editTodo = (id) => {
        const index = todos.findIndex(todo => todo.id === id);
        const todoToEdit = todos[index];
        setTitle(todoToEdit.title);
        setDesc(todoToEdit.description);
        setEditingIndex(index);
        setOpenform(true);
    };

    const deleteTodo = (id) => {
        const updatedTodos = [...todos];
        const index = todos.findIndex(todo => todo.id === id);
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };
    
    const filtertodo = (id, event) => {
        const updatedTodos = [...todos];
        const index = updatedTodos.findIndex(todo => todo.id === id);

        if (index !== -1) {
            updatedTodos[index].status = event;

            const checkedTodos = updatedTodos.filter(todo => todo.status);
            const uncheckedTodos = updatedTodos.filter(todo => !todo.status);

            const reorderedTodos = [...uncheckedTodos, ...checkedTodos];

            setTodos(reorderedTodos);
            localStorage.setItem('todos', JSON.stringify(reorderedTodos));
        }
    };


    const searchTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    return (
        <>
            <div className='todo'>
                <h3> Activity</h3>
                <div className='find-box'>
                    <center>

                        <form className="form">
                            <button>
                                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                            <input
                                className="input"
                                placeholder="Type your text"
                                required=""
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                        </form>
                    </center>

                </div>

                <div className='activity-container'>
                    <div className='activity-box'>
                        {searchTodos.map((todo, index) => (
                            <div className='activity-content' key={index} style={{ order: todo.status ? 1 : 0 }}>

                                <label className="containers">
                                    <input type="checkbox" name="checktodo" onChange={(e) => filtertodo(todo.id, e.target.checked)} checked={todo.status} />
                                    <div className="checkmark"></div>
                                </label>

                                <div className='context'>
                                    <div className='title'>{todo.title}</div>
                                    <div className='desc'>{todo.description}</div>

                                </div>


                                <div className='btn-box visible'>
                                    <button className='edit-btn' onClick={() => editTodo(todo.id)}>

                                        {todo.id && (
                                            <box-icon type='solid' color="white" name='message-edit'></box-icon>
                                        )}
                                    </button>
                                    <button className='delete-btn' onClick={() => deleteTodo(todo.id)}>

                                        {todo.id && (
                                            <box-icon type='solid' color="white" name='message-alt-x'></box-icon>
                                        )}

                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='add-btn'>
                    <button onClick={handleAddButtonClick}>
                        <box-icon size='lg' color="white" name='plus-circle'></box-icon>
                    </button>
                </div>
            </div>
            {openform && (
                <>
                    <div className='blur'></div>
                    <div className='todo-container'>
                        <div className='form-container'>

                            <div className='close-btn' onClick={handleCloseButtonClick}>
                                <span role="img" aria-label="delete">
                                    ❌
                                </span>
                            </div>
                            <center><h2>Add todo</h2></center>
                            <form>
                                <div className="user-box ">
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label>Title</label>
                                </div>

                                <div className="user-box">
                                    <input
                                        type="text"
                                        name="description"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                    <label>Description</label>
                                </div>

                                <center><button type="button" className="submit-btn" onClick={addTodos} id="bottone1"><strong>{editingIndex !== null ? 'Save' : 'Submit'}</strong></button>
                                </center>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}