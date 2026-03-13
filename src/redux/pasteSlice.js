import { createSlice } from '@reduxjs/toolkit' // importing Redux Toolkit helper which simplifies creating Redux reducers, actions, and state logic in a single structure
import { ToastContainer, toast } from 'react-toastify'; // importing toast notification utility so the app can show small popup messages after operations like create, update, or delete

const initialState = { // defining the initial global state of this slice which represents the starting data structure for pastes
  pastes: localStorage.getItem('pastes') // checking if the browser localStorage already contains saved pastes so previously stored data can persist across page refresh
    ? JSON.parse(localStorage.getItem('pastes')) // if pastes exist in localStorage convert the stored JSON string back into a JavaScript array so Redux can use it
    : [] // if nothing exists in localStorage start with an empty array meaning there are currently no saved pastes
}

export const pasteSlice = createSlice({ // creating a Redux slice which groups together state, reducers, and actions related specifically to paste management

  name: 'paste', // naming this slice "paste" so Redux can identify this portion of the global state tree

  initialState, // assigning the previously defined initialState as the starting data for this slice when the application loads

  reducers: { // reducers are functions responsible for updating the Redux state when an action is dispatched

    addtoPaste: (state, action) => { // reducer that handles the logic for creating and storing a new paste

      const paste = action.payload // retrieving the paste object sent from a component (usually Home component when user clicks create)
      state.pastes.push(paste) // directly adding the new paste object into the pastes array managed by Redux
      localStorage.setItem('pastes', JSON.stringify(state.pastes)) // updating browser localStorage so the newly added paste remains saved even after refreshing the page
      toast('paste created sucessfully') // showing a notification to inform the user that the paste has been successfully created

    },

    updatetoPaste: (state, action) => { // reducer responsible for modifying an existing paste when the user edits it

      const paste = action.payload // retrieving the updated paste data sent from the Home component
      const index = state.pastes.findIndex((item) => item._id === paste._id) // searching inside the pastes array to find the index of the paste whose id matches the updated paste id
      if (index >= 0) { // ensuring the paste exists in the array before attempting to update it
        state.pastes[index] = paste // replacing the existing paste object at that index with the newly updated paste data
        localStorage.setItem('pastes', JSON.stringify(state.pastes)) // saving the updated pastes array back into localStorage so the edited version persists
        toast('paste updated sucessfully') // displaying a notification to inform the user that the paste has been successfully updated
      }

    },

    resetallPaste: (state, action) => { // reducer that clears all stored pastes at once
      state.pastes = [] // resetting the Redux pastes array to empty which removes all paste records from application state
      localStorage.removeItem('pastes') // deleting the stored pastes data from browser localStorage so no old data remains after reset
      // reducer that will remove all pastes and reset state
    },

    removeFromPaste: (state, action) => { // reducer responsible for deleting a specific paste selected by the user
      const pasteId = action.payload // retrieving the id of the paste that should be removed from the Redux store
      const index = state.pastes.findIndex((item) => item._id === pasteId) // locating the index of the paste in the array whose id matches the given pasteId
      if (index >= 0) { // verifying that the paste actually exists before attempting deletion
        state.pastes.splice(index, 1) // removing that paste from the array using splice which deletes the element at the located index
        localStorage.setItem('pastes', JSON.stringify(state.pastes)) // saving the updated array back into localStorage so the deleted paste is permanently removed
        toast.success('paste deleted sucessfully') // showing a success notification informing the user that the paste was deleted

      }

    }
  }
})

export const { addtoPaste, updatetoPaste, resetallPaste, removeFromPaste } = pasteSlice.actions // exporting all generated Redux actions so React components can dispatch them to modify the paste data

export default pasteSlice.reducer // exporting the reducer function so it can be connected to the Redux store and manage the paste portion of global state


{/*
1. Conceptual Flow of pasteSlice (Redux Logic)

Application Starts
        ↓
Redux store loads pasteSlice
        ↓
initialState runs
        ↓
Check localStorage for "pastes"
        ↓
If found → load saved pastes into Redux
If not found → start with empty array




2. When User Creates a Paste (Home Component)

User writes title + content
        ↓
Click "Create Paste"
        ↓
Home component dispatches addtoPaste(paste)
        ↓
Redux reducer addtoPaste runs
        ↓
New paste object pushed into state.pastes
        ↓
Updated pastes array saved to localStorage
        ↓
Toast notification shown
        ↓
Redux store updated
        ↓
Paste page automatically shows new paste



3. When User Updates a Paste

User clicks Edit
        ↓
URL contains pasteId
        ↓
Home loads existing paste
        ↓
User modifies content
        ↓
Dispatch updatetoPaste(updatedPaste)
        ↓
Redux finds paste with same _id
        ↓
Replace old paste with updated paste
        ↓
Save updated array to localStorage
        ↓
Toast "paste updated successfully"



4. When User Deletes a Paste

User clicks Delete in Paste page
        ↓
handleDelete dispatches removeFromPaste(pasteId)
        ↓
Redux reducer finds paste index
        ↓
splice() removes paste from array
        ↓
Updated array saved to localStorage
        ↓
Toast "paste deleted successfully"
        ↓
UI re-renders without that paste



5. When User Clears All Pastes

resetallPaste dispatched
        ↓
state.pastes = []
        ↓
localStorage.removeItem("pastes")
        ↓
All paste data removed from app



6. Overall Architecture Flow

React Component (Home / Paste / Viewpaste)
        ↓
dispatch(action)
        ↓
Redux Slice (pasteSlice reducers)
        ↓
State Updated in Redux Store
        ↓
localStorage Updated
        ↓
React UI re-renders with new data

*/}