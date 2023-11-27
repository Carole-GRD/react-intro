
// import TodosData from './data/todolist.json';

import './App.css'
import Navigate from './containers/navigate/Navigate'
// import TodoList from './containers/todoList/TodoList'
// import ReactCalendar from './containers/calendar/ReactCalendar'


// import { Routes, Route } from 'react-router-dom' 
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <Navigate />
      <Outlet />
      {/* <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/calendar" element={<ReactCalendar />} />
      </Routes> */}
    </>
  )
}

export default App
