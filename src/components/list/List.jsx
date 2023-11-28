
import { useState } from 'react';
import './list.css'
import binImage from '../../assets/bin.png';

function List( { todos, onChecked, onDeleteTodo, onDeleteAll, onDeleteCompleted, setTodos } ) {

    const [classActive, setClassActive] = useState('all');
    const [draggedItem, setDraggedItem] = useState(null);

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


    const handleDragStart = (event, id) => {
        event.dataTransfer.setData('text/plain', id);
        setDraggedItem(id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    
    const handleDrop = (event, id) => {
        event.preventDefault();

        const draggedItemId = event.dataTransfer.getData('text/plain');
        
        // Récupérer l'index de l'élément glissé
        const draggedIndex = todos.findIndex(todo => todo.id === draggedItemId);
        if (draggedIndex === -1) {
            // L'élément n'a pas été trouvé, gérer l'erreur si nécessaire
            return;
        }

        // Créer une copie du tableau des todos
        const updatedTodos = [...todos];

        // Retirer l'élément déplacé de sa position d'origine
        const [removedTodo] = updatedTodos.splice(draggedIndex, 1);

        // Trouver l'index de l'endroit où l'élément doit être inséré
        const dropIndex = todos.findIndex(todo => todo.id === id);

        // Insérer l'élément à sa nouvelle position
        updatedTodos.splice(dropIndex, 0, removedTodo);

        // Mettre à jour l'état avec le nouveau tableau d'éléments
        setTodos(updatedTodos);

        // Réinitialiser l'état de l'élément en cours de glisser
        setDraggedItem(null);
    };

    return (
        <div className='list'>
            
            <h2>Todos</h2>

            {todosToDisplay.map((todo) => (
                <div 
                    key={todo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, todo.id)}
                    className={draggedItem === todo.id ? 'dragged-item' : ''}
                >
                    <div className="todo-container">
                        <button className='bin-btn' onClick={() => onDeleteTodo(todo.id)}>
                            <img 
                                className="bin-img"
                                src={binImage} 
                                alt="Supprimer la todo" 
                            />
                        </button>
                        <input 
                            type="checkbox" 
                            name={todo.title} 
                            // id={todo.title} 
                            checked={todo.checked}
                            onChange={() => onChecked(todo.id)}
                        />
                        <label /*htmlFor={todo.title}*/>{todo.title}</label>
                        <div className="separate"></div>
                    </div>
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