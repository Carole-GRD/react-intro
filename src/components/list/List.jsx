
import { useState } from 'react';
import './list.css'

function List( { todos, onChecked, onDeleteTodo } ) {


    const [todosToDisplay, setTodoToDisplay] = useState('all');

    function handleDisplayAll() {
        setTodoToDisplay('all');
    }

    function handleDisplayActive() {
        setTodoToDisplay('active');
    }

    function handleDisplayCompleted() {
        setTodoToDisplay('completed');
    }

    const todosActive = todos.filter(todo => todo.checked === false);
    const todosCompleted = todos.filter(todo => todo.checked === true);

    const displayTodos = 
        todosToDisplay === 'all' 
        ? todos 
        : (todosToDisplay === 'active' ? todosActive : todosCompleted);

    return (
        <div className='list'>
            
            <h2>Todos</h2>

            {displayTodos.map((todo) => (
                <div key={todo.id}>
                    <button className='bin-btn' onClick={() => onDeleteTodo(todo.id)}>
                        <img 
                            className="bin-img"
                            src="/src/assets/bin.png" 
                            alt="Supprimer la todo" 
                        />
                    </button>
                    <input 
                        type="checkbox" 
                        name={todo.name} 
                        id={todo.name} 
                        checked={todo.checked}
                        onChange={() => onChecked(todo.id)}
                    />
                    <label htmlFor={todo.name}>{todo.name}</label>
                </div>
            ))}

            <div className="select">
                <div className="nbr">
                    {todos.length} item{todos.length > 1 && 's'} left
                </div>
                <div className="btn">
                    <button onClick={handleDisplayAll}>
                        All
                    </button>
                    <button onClick={handleDisplayActive}>
                        Active
                    </button>
                    <button onClick={handleDisplayCompleted}>
                        Completed
                    </button>
                </div>
            </div>

        </div>
    )
}

export default List