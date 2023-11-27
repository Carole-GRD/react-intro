import App from "../App";
import TodoList from "../containers/todoList/TodoList";
import ReactCalendar from "../containers/calendar/ReactCalendar";
import BigCalendar from "../containers/bigCalendar/BigCalendar";


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
            },
            {
                path: "/big-calendar",
                element: <BigCalendar />
            }
        ]
    }
    
];

