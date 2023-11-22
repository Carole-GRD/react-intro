import { useRef } from "react";

import './form.css'

function Form( { onAddTodo } ) {

    const inputRef = useRef();

    function handleAddTodo(event) {
        event.preventDefault(); 
        
        const inputElement = inputRef.current.value;    // New value 
        if (inputElement.trim() !== '') {
            onAddTodo(inputElement);                        // Notify the parent about the change
            inputRef.current.value = '';                    // Clear input after adding todo
        }
    }

    return (
        <form className='form'>
            <input 
                ref={inputRef} 
                type="text" 
                name="form" 
                placeholder="Type a new todo" 
            />
            <button onClick={handleAddTodo}>
                Add Todo
            </button>
        </form>
    )
}

export default Form