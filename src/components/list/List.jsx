
import { useState } from 'react';
import './list.css'

function List( { todos, onChecked, onDeleteTodo, onDeleteAll, onDeleteCompleted } ) {

    const [classActive, setClassActive] = useState('all');

    const todosToDisplay = (() => {
        switch (classActive) {
            case 'active':
                return todos.filter(todo => !todo.checked);
            case 'completed':
                return todos.filter(todo => todo.checked);
            default:
                return todos;
        }
    })();

    const handleDisplayAll = () => setClassActive('all');
    const handleDisplayActive = () => setClassActive('active');
    const handleDisplayCompleted = () => setClassActive('completed');
    
    const handleDeleteAll = () => onDeleteAll();
    const handleDeleteCompleted = () => onDeleteCompleted();

    return (
        <div className='list'>
            
            <h2>Todos</h2>

            {todosToDisplay.map((todo) => (
                <div key={todo.id}>
                    <button className='bin-btn' onClick={() => onDeleteTodo(todo.id)}>
                        <img 
                            className="/src/assets/bin.png"
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
                    {todos.length} todo{todos.length > 1 && 's'}
                </div>
                <div className="btn">
                    <button onClick={handleDisplayAll} className={classActive === 'all' ? "active" : ""}>
                        All
                    </button>
                    <button onClick={handleDisplayActive} className={classActive === 'active' ? "active" : ""}>
                        Active
                    </button>
                    <button onClick={handleDisplayCompleted} className={classActive === 'completed' ? "active" : ""}>
                        Completed
                    </button>
                </div>
            </div>


            <div className="delete">
                <button onClick={handleDeleteCompleted}>
                    Delete completed
                </button>
                <button onClick={handleDeleteAll}>
                    Delete all
                </button>
            </div>

        </div>
    )
}

export default List