import { useState } from 'react';


import './App.css'
import Form from './components/form/Form'
import Header from './components/header/Header'
import List from './components/list/List'


function App() {

  const initialTodos = [
    { id: 1, name: "Learn React", checked: false },
    { id: 2, name: "Build a React app", checked: false },
    { id: 3, name: "Explore React Hooks", checked: false },
    { id: 4, name: "Complete coding challenge", checked: false },
    { id: 5, name: "Read React documentation", checked: false },
    { id: 6, name: "Practice React components", checked: false }
  ];

  const [todos, setTodos] = useState(initialTodos);

  console.log(typeof (todos.length + 1));

  function addTodo(newTodo) {
    const newTodos = [
      ...todos,
      { id: todos.length + 1, name: newTodo, checked: false },
    ];
    setTodos(newTodos);
  }

  const checked = (id) => {
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


  
  return (
    <>
      <Header />
      <Form onAddTodo={addTodo} />
      <List todos={todos} onChecked={checked} />
    </>
  )
}

export default App
