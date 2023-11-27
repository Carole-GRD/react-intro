import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// import { BrowserRouter } from 'react-router-dom' 

// Routing : Imports
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { route } from './routes/routes.jsx'

// Routing : Création du router
const router = createBrowserRouter(route)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      {/* <App /> */}
    {/* </BrowserRouter> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
