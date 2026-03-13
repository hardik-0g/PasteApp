import React from 'react'
import { NavLink } from 'react-router-dom' // used to navigate between routes and also detect which route is currently active

function Navbar() {
  return (
    <div className="w-full bg-white shadow-md">

      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-bold text-blue-600">
          PasteApp {/* just the title of the application shown in the navbar */}
        </h1>

        <div className="flex gap-6 text-gray-700 font-medium">

          <NavLink
            to="/" // clicking this navigates the user to the Home route defined in App.js
            className={({isActive}) => // react-router automatically passes isActive (true/false) depending on whether this NavLink route matches the current URL
              `hover:text-blue-600 transition ${
                isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "" // if this route is active it highlights the link
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes" // clicking this navigates to the page that shows all saved pastes
            className={({isActive}) => // react-router automatically passes isActive (true/false) depending on whether this NavLink route matches the current URL
              `hover:text-blue-600 transition ${
                isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "" // highlights when the user is currently on /pastes route
              }`
            }
          >
            Pastes
          </NavLink>

        </div>
      </div>

    </div>
  )
}

export default Navbar // exported so App.js can render this navbar on every route
