import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import Viewpaste from './components/Viewpaste'

import './App.css'

const router= createBrowserRouter( // defining all routes of the application in one router object
  [
    {
      path:'/', // when user visits the homepage
      element:
      <div>
        <Navbar/> 
        <Home/>  {/* Home component will load here where user likely creates a new paste */}

      </div>

    },
    {
      path:'/pastes', // route to show all saved pastes
      element:
      <div>
        <Navbar/>
        <Paste/> {/* Paste component likely fetches pastes from Redux/localStorage and displays them */}

      </div>


    },
    {
      path:'/pastes/:id', // dynamic route where :id represents a specific paste id
      element:
      <div>
        <Navbar/>
        <Viewpaste/> {/* this component reads the id from URL and displays that particular paste */}

      </div>

    },
    

  ]
)

function App() {

  const [count, setCount] = useState(0) // unused state (probably leftover from Vite template)

  return (
    <>
    <RouterProvider router={router}/> {/* activates routing so components render based on URL */}
      
    </>
  )
}

export default App
