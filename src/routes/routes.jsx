import App from "../App";
import TodoList from "../containers/todoList/TodoList";
import ReactCalendar from "../containers/calendar/ReactCalendar";


export const route = [
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <TodoList />,
            },
            {
                path: "/calendar",
                element: <ReactCalendar />,
            }
        ]
    }
    
];

