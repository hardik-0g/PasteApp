import React, { useEffect } from 'react' // importing React and useEffect hook so the component can run side-effect logic automatically when some data changes (for example loading an existing paste when editing)
import { useState } from 'react' // useState allows the component to temporarily store user input like title and content inside the component memory
import { useSearchParams } from 'react-router-dom' // this hook allows the component to read query parameters from the URL which helps determine whether the page is in create mode or edit mode
import { addtoPaste, updatetoPaste } from "../redux/pasteSlice" // importing Redux actions that will modify the global paste data stored in the Redux store
import { useDispatch, useSelector } from "react-redux"; // hooks used to communicate with Redux: selector reads global state and dispatch sends actions to update it

function Home() {

    const [title, setTitle] = useState('') // state variable that stores the title typed by the user so the UI and internal data remain synchronized

    const [value, setValue] = useState('') // state variable that stores the content/body of the paste typed by the user

    const [searchParams, setSearchParams] = useSearchParams() // gives access to URL query parameters and also allows modifying them

    const pasteId = searchParams.get('pasteId') // reading pasteId from the URL; if this exists it means the page should load an existing paste for editing instead of creating a new one

    const dispatch = useDispatch() // dispatch function used to send actions to the Redux store so global paste data can be updated

    const allPaste = useSelector((state) => state.paste.pastes) // retrieving the array of all saved pastes from the Redux store so this component can access previously stored pastes

    useEffect(() => { // this effect runs when the component loads or when pasteId changes
        if (pasteId) { // if pasteId exists it indicates that the user opened this page to edit an existing paste

            const paste = allPaste.find((p) => p._id === pasteId) // searching inside the array "allPaste" to find the paste object whose unique identifier (_id) matches the pasteId taken from the URL

            setTitle(paste.title) // filling the title input with the existing paste title so the user can see and edit the previous value

            setValue(paste.content) // filling the textarea with the stored paste content so the user can modify it
        }

    }, [pasteId]) // dependency ensures this effect runs again if a different pasteId appears in the URL

    function createPaste() { // this function acts as the main logic handler for both creating a new paste and updating an existing paste

        const paste = { // creating a structured paste object that represents a single paste record
            title: title, // assigning the current title state into the paste object
            content: value, // assigning the current content state into the paste object
            _id: pasteId || Date.now().toString(36), // if editing keep the same id otherwise generate a unique id using the timestamp
            createdAt: new Date().toISOString() // storing the creation time of the paste so the app knows when it was created
        }

        if (pasteId) { // if pasteId exists it means we must update an existing paste rather than create a new one

            dispatch(updatetoPaste(paste)) // sending an update action to Redux so the matching paste in the store is replaced with the edited data

        } else { // if pasteId does not exist it means the user is creating a completely new paste

            dispatch(addtoPaste(paste)) // sending an action to Redux to add the newly created paste object into the global paste collection
        }

        setTitle('') // clearing the title input so the form resets after the paste is saved

        setValue('') // clearing the textarea so the user can start writing another paste

        setSearchParams({}) // removing pasteId from the URL which switches the component back to normal create mode
    }

    return (
        <div className='flex flex-col items-center justify-center mt-12 gap-6'>
            <div className='flex justify-center gap-10 bg-white shadow-md p-6 rounded-xl border border-gray-200'>
                <input
                    className='p-3 rounded-xl bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-[280px]'
                    type='text'
                    placeholder='Enter Title'
                    value={title} // binding the input field with the title state so the UI always displays the current stored title value
                    onChange={(e) => setTitle(e.target.value)} // whenever the user types this updates the state so React internally stores the latest title
                />
                <button
                    onClick={createPaste} // clicking this button triggers the logic that either creates a new paste or updates an existing paste
                    className='px-5 py-3 rounded-xl mt-1 bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm'
                >
                    {pasteId ? 'update my paste' : 'create my paste'} {/* the button label dynamically changes depending on whether the component is in edit mode or create mode */}
                </button>
            </div>
            <div className='mt-4 w-full flex justify-center'>
                <textarea
                    className='rounded-xl bg-gray-50 border border-gray-300 min-w-[650px] p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition resize-none'
                    value={value} // binding textarea content with the value state so React controls the displayed content
                    placeholder='Enter Content'
                    onChange={(e) => setValue(e.target.value)} // whenever the user types the content state updates so the paste data stays synchronized
                    rows={20}
                />
            </div>
        </div>
    )
}

export default Home // exporting this component so the router in App.js can render it when the "/" route is visited




{/* 

Conceptual Flow of the Home Component

Create Paste Mode

User opens "/"
      ↓
Home component loads
      ↓
User writes title + content
      ↓
click "create my paste"
      ↓
createPaste()
      ↓
dispatch(addtoPaste)
      ↓
Redux store updated
      ↓
localStorage updated (inside slice)


Conceptual Flow of the Home Component

Edit Paste Mode


User clicks edit from Paste page
      ↓
URL becomes  /?pasteId=abc123
      ↓
Home reads pasteId from URL
      ↓
useEffect finds that paste from Redux
      ↓
title + content automatically filled
      ↓
User edits and clicks update
      ↓
dispatch(updatetoPaste)
      ↓
Redux store updated


    
    */}
