import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../../components/header/Header';
import Form from '../../components/form/Form';
import List from '../../components/list/List';

import TodosData from '../../data/todolist.json';

const LSKEY = "MyTodoApp";


function TodoApp() {

    const [todoSelected, setTodoSelected] = useState(null);

    // TODO : ne récupérer le localStorage que lors du chargement de la page
    // Récupération des todos depuis le localStorage ou utilisation d'une liste vide par défaut
    // const initialTodos = JSON.parse(window.localStorage.getItem(LSKEY + ".todos")) || [];
    // const [todos, setTodos] = useState(initialTodos);

    // TODO : faire corriger code 
    const [todos, setTodos] = useState(() => {
        const storedTodos = JSON.parse(
            window.localStorage.getItem(LSKEY + ".todos")
        );
        // console.log('TodosData', TodosData);
        // console.log('storedTodos', storedTodos);
        return (storedTodos == null || storedTodos.length === 0) ? TodosData : storedTodos;
    });


    // const [todos, setTodos] = useState([]);
    // localStorage.clear();


    // TODO : n'enregistrer dans le localStorage que lorsqu'on quitte la page
    useEffect(() => {
        // Sauvegarder les todos dans le localStorage à chaque changement
        window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
    }, [todos])


    function addTodo(newTodo) {
        // "isTodo" vérifie que la todo n'existe pas déjà
        const isTodo = todos.find(todo => todo.title === newTodo);
        if (!isTodo) {
            const newTodos = [
                ...todos,
                { id: uuidv4(), title: newTodo, checked: false },
            ];
            setTodos(newTodos);
        }
    }

    function checked(id) {
        // Mise à jour du state des todos
        setTodos((prevTodos) => (
            // Utilisation de la méthode map pour créer un nouveau tableau de todos
            prevTodos.map((todo) =>
                // Vérification si l'ID du todo correspond à l'ID fourni en argument
                todo.id === id
                    // Si l'ID correspond, retourne un nouveau todo avec la propriété 'checked' inversée
                    ? { ...todo, checked: !todo.checked }
                    // Si l'ID ne correspond pas, retourne le même todo sans modification
                    : todo
            )
        ))
    }

    function deleteTodo(id) {
        // trouve la todo à supprimer
        const todoToDelete = todos.find(todo => todo.id === id);
        if (todoToDelete) {
            // trouve l'index de la todo dans la liste
            const index = todos.indexOf(todoToDelete);
            // fais une copie 
            const newTodos = [...todos];
            // supprime la todo de la copie
            newTodos.splice(index, 1);
            // réactualise l'état de la liste todos
            setTodos(newTodos);
        }
    }

    function deleteAll() {
        setTodos([]);
    }

    function deleteCompleted() {
        const todosNotCompleted = todos.filter(todo => !todo.checked);
        setTodos(todosNotCompleted);
    }

    function selectTodo(todoSelect) {
        setTodoSelected(todoSelect);
        

    }

    function updateTodo(todoToUpdate, todoSelected) {
        // console.log('todoToUpdate : ', todoToUpdate);
        // console.log('todoSelected : ', todoSelected);
        const todoUpdated = todos.find(todo => todo.id === todoSelected.id);

        const newTodo = {...todoSelected, title: todoToUpdate}
        // console.log('todoUpdated : ', todoUpdated);
        if (todoUpdated) {
            // trouve l'index de la todo dans la liste
            const index = todos.indexOf(todoUpdated);
            // fais une copie 
            const newTodos = [...todos];
            // supprime la todo de la copie
            newTodos.splice(index, 1, newTodo);
            // réactualise l'état de la liste todos
            setTodos(newTodos);
        }
        setTodoSelected(null);
    }



    return (
        <>
            <Header />
            <Form onAddTodo={addTodo} />
            <List
                todos={todos}
                onChecked={checked}
                onDeleteTodo={deleteTodo}
                onSelectTodo={selectTodo}
                onUpdateTodo={updateTodo}
                onDeleteAll={deleteAll}
                onDeleteCompleted={deleteCompleted}
                setTodos={setTodos}
                todoSelected={todoSelected}
            />
        </>
    )
}

export default TodoApp
