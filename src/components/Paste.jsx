import React, { useState } from 'react' // importing React and useState so this component can maintain internal UI state like the search text
import { useDispatch, useSelector } from 'react-redux' // hooks used to interact with Redux store: selector reads global data and dispatch sends actions to modify it
import { removeFromPaste } from '../redux/pasteSlice'; // importing the Redux action responsible for deleting a paste from the global store
import { ToastContainer, toast } from 'react-toastify'; // toast library used to show popup notifications such as when text is copied

const Paste = () => {

  const [searchTerm, setsearchTerm] = useState('') // state variable storing the search input so the UI can filter pastes dynamically while typing

  const pastes = useSelector((state) =>
    state.paste.pastes); // reading the pastes array from Redux global state so this component can display all stored pastes

  const dispatch = useDispatch() // dispatch function used to send delete actions to Redux when the user removes a paste

  const filteredData = pastes.filter( // filtering the full paste list based on the search input
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()) // comparing paste titles with the search term in a case-insensitive way so matching pastes remain visible
  )

  function handleDelete(pasteId) { // function that handles deletion when user clicks the delete button
    dispatch(removeFromPaste(pasteId)) // sending an action to Redux which removes the paste with this id from the store and localStorage
  }

  return (
    <div className='flex flex-col items-center mt-10'>

      <input
        className='p-3 rounded-xl bg-gray-50 text-gray-800 border border-gray-300 min-w-[650px] mt-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition'
        type='search'
        placeholder='search here'
        value={searchTerm} // binding the search input to searchTerm state so the UI always reflects the current typed value
        onChange={(e) => setsearchTerm(e.target.value)} // updating the searchTerm state whenever the user types which triggers re-render and filtering
      />

      <div className='flex flex-col gap-6 mt-8 max-w-[700px] w-full'>

        {
          filteredData.length > 0 && // ensuring that pastes exist before attempting to render them
          filteredData.map( // looping through every filtered paste object to generate UI cards dynamically
            (paste) => {
              return (
                <div className='border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition' key={paste?._id}> {/* each card represents one paste and uses its id as React key for efficient rendering */}

                  <div className='text-xl font-semibold text-gray-800 mb-2'>
                    {paste.title} {/* displaying the title of the paste */}
                  </div>

                  <div className='text-gray-600 mb-4 break-words whitespace-pre-wrap'>
                    {paste.content} {/* displaying the full content/body of the paste */}
                  </div>


                  <div className='flex flex-row gap-3 place-content-evenly'> {/* container holding action buttons for each paste */}

                    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'>
                      <a href={`/?pasteId=${paste?._id}`}> {/* navigating to Home component while attaching pasteId in URL so Home loads this paste for editing */}
                        Edit
                      </a>
                    </button>

                    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'>
                      <a href={`/pastes/${paste?._id}`}> {/* navigating to the Viewpaste route where this specific paste can be viewed separately */}
                        View
                      </a>
                    </button>

                    <button
                      onClick={() => handleDelete(paste?._id)} // calling delete handler with this paste id so Redux removes it from the global store
                      className='px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => { // function executed when user clicks copy
                        navigator.clipboard.writeText(paste?.content) // using browser clipboard API to copy the paste content directly to the user's clipboard
                        toast.success('copied to clipboard') // showing a toast notification confirming that the content was copied
                      }}
                      className='px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'
                    >
                      Copy
                    </button>

                  </div>

                  <div className='text-sm text-gray-400 mt-4'>
                    {new Date(paste.createdAt).toLocaleDateString('en-IN', { // converting the stored creation timestamp into a readable date format
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>

                </div>
              )
            }
          )
        }

      </div>

    </div>
  )
}

export default Paste // exporting the component so the router can render it when the "/pastes" route is visited


{/*
1. Conceptual Flow of Paste Component

Paste Page Loads
        ↓
Component renders
        ↓
useSelector reads all pastes from Redux store
        ↓
pastes array becomes available inside component




2. Search Filtering Flow

User types in search input
        ↓
onChange updates searchTerm state
        ↓
Component re-renders
        ↓
pastes.filter() runs
        ↓
filteredData contains only pastes whose title matches search
        ↓
UI displays only matching pastes




3.Rendering Paste Cards Flow

filteredData.map() runs
        ↓
Each paste object is converted into a card UI
        ↓
Card displays
   • Title
   • Content
   • Buttons (Edit, View, Delete, Copy)
   • Creation date






4. Edit Button Flow

User clicks Edit
        ↓
Browser navigates to
/?pasteId=<pasteId>
        ↓
Home component loads
        ↓
Home reads pasteId from URL
        ↓
Existing paste data loaded for editing



5. View Button Flow

User clicks View
        ↓
Browser navigates to
/pastes/<pasteId>
        ↓
Viewpaste component loads
        ↓
useParams extracts id
        ↓
Redux pastes searched
        ↓
Selected paste displayed in read-only mode





6. Delete Button Flow

User clicks Delete
        ↓
handleDelete(pasteId) runs
        ↓
dispatch(removeFromPaste(pasteId))
        ↓
Redux slice removes paste from state
        ↓
localStorage updated
        ↓
Component re-renders
        ↓
Paste disappears from list




7. Copy Button Flow

User clicks Copy
        ↓
navigator.clipboard.writeText()
        ↓
Paste content copied to system clipboard
        ↓
toast.success notification appears



8. Overall Data Flow

Redux Store (pastes data)
        ↓
Paste Component reads data using useSelector
        ↓
Search filters the data
        ↓
filteredData.map() generates UI cards
        ↓
User actions trigger navigation or Redux updates

  
*/}
