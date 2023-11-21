import './form.css'

function Form() {
    return (
        <form action="" className='form'>
            <input type="text" placeholder="Type a new todo" />
            {/* TODO : changer type button en type submit ! */}
            <button type="button">Add Todo</button>
        </form>
    )
}

export default Form