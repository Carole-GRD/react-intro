import App from "../App";
import TodoApp from "../containers/todoApp/todoApp";
import ReactCalendar from "../containers/calendar/ReactCalendar";
import BigCalendar from "../containers/bigCalendar/BigCalendar";


export const route = [
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <TodoApp />,
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

