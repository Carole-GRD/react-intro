
// import TodosData from './data/todolist.json';

import './App.css'
import ReactCalendar from './containers/calendar/ReactCalendar'
import TodoList from './containers/todoList/TodoList'


function App() {

  return (
    <>
      <TodoList />
      <ReactCalendar />
    </>
  )
}

export default App
