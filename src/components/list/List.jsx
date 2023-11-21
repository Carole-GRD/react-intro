import { useState } from 'react';
import './list.css'

function List() {

    const initialTodos = [
        { id: 1, name: "Learn React", checked: false },
        { id: 2, name: "Build a React app", checked: false },
        { id: 3, name: "Explore React Hooks", checked: false },
        { id: 4, name: "Complete coding challenge", checked: false },
        { id: 5, name: "Read React documentation", checked: false },
        { id: 6, name: "Practice React components", checked: false }
    ];

    const [todos, setTodos] = useState(initialTodos);

    const handleChange = (id) => {
        // Mise à jour du state des todos
        setTodos((prevTodos) => (
            // Utilisation de la méthode map pour créer un nouveau tableau de todos
            prevTodos.map((todo) => 
                // Vérification si l'ID du todo correspond à l'ID fourni en argument
                todo.id === id 
                    // Si l'ID correspond, retourne un nouveau todo avec la propriété 'checked' inversée
                    ? { ...todo, checked: !todo.checked} 
                     // Si l'ID ne correspond pas, retourne le même todo sans modification
                    : todo
            )
        ))
    }
    console.log(todos);

    return (
        <div className='list'>
            
            <h2>Todos</h2>

            {todos.map((todo) => (
                <div key={todo.id}>
                    <input 
                        type="checkbox" 
                        name={todo.name} 
                        id={todo.name} 
                        checked={todo.checked}
                        onChange={() => handleChange(todo.id)}
                    />
                    <label htmlFor={todo.name}>{todo.name}</label>
                </div>
            ))}

        </div>
    )
}

export default List