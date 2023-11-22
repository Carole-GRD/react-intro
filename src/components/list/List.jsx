
import './list.css'

function List( { todos, onChecked } ) {

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
                        onChange={() => onChecked(todo.id)}
                    />
                    <label htmlFor={todo.name}>{todo.name}</label>
                </div>
            ))}

        </div>
    )
}

export default List