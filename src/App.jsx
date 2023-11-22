import { useState, useEffect } from 'react';

// import TodosData from './data/todolist.json';

import './App.css'
import Form from './components/form/Form'
import Header from './components/header/Header'
import List from './components/list/List'


const LSKEY = "MyTodoApp";


function App() {

  console.log('test');

  // Récupération des todos depuis le localStorage ou utilisation d'une liste vide par défaut
  const initialTodos = JSON.parse(window.localStorage.getItem(LSKEY + ".todos")) || [];
  const [todos, setTodos] = useState(initialTodos);
  
  // localStorage.clear();

  useEffect(() => {
    console.log('todos after setTodos', todos);
    // Sauvegarder les todos dans le localStorage à chaque changement
    window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
  }, [todos])

  function addTodo(newTodo) {
    const newTodos = [
      ...todos,
      { id: todos.length + 1, name: newTodo, checked: false },
    ];
    console.log('newTodos after addTodo', newTodos);
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
