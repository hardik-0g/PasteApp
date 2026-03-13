import React, { useEffect } from 'react' // importing React and useEffect though useEffect is not used here; typically used when side effects or data loading logic is needed
import { useState } from 'react' // importing useState though not used in this component; normally used to store local component state
import { useParams, useSearchParams } from 'react-router-dom' // useParams allows reading dynamic values from the URL such as the paste id
import { addtoPaste, updatetoPaste } from "../redux/pasteSlice" // Redux actions imported but not used here; they belong to create/edit logic normally used in Home component
import { useDispatch, useSelector } from "react-redux"; // selector allows this component to read paste data from the Redux store

function Viewpaste() {

  const {id}=useParams() // extracting the dynamic id from the URL path "/pastes/:id" so the component knows which paste should be displayed

  const allPaste=useSelector((state)=>state.paste.pastes) // retrieving the full list of pastes from the Redux store so the component can search for the required paste

  const paste=allPaste.filter((p)=>p._id===id)[0] // filtering the pastes array to locate the paste whose _id matches the id from the URL and selecting the first matched object

  console.log('final paste',paste) // logging the found paste object in the console for debugging and verifying that the correct paste was retrieved

  return (
    <div>

        <div className='flex justify-center gap-20 '> 

        <input
        className='p-2 rounded-2xl bg-blue-50 text-gray-800 border-2 border-blue-400' 
        type='text' 
        placeholder='enter value' 
        value={paste.title} // displaying the title of the selected paste inside the input field
        disabled // disabling the input so the user cannot edit it since this page is only meant for viewing the paste
        onChange={(e)=>setTitle(e.target.value)} // change handler exists but will never run because the input is disabled
        />

        </div>

        <div className='mt-8'>

            <textarea
            className='rounded-2xl bg-blue-50 border-2 border-blue-400 min-w-[500px] p-3' // styling for textarea that visually displays the paste content
            value={paste.content} // displaying the content/body of the selected paste
            disabled // disabling editing so the content is only viewable and not modifiable on this page
            placeholder='enter content here' // placeholder in case content is empty
            onChange={(e)=>setValue(e.target.value)} // change handler exists but will not run because textarea is disabled
            rows={20} // defining the visible height of the textarea so longer pastes can be viewed comfortably
            />

        </div>
    
    </div>
  )
}

export default Viewpaste // exporting this component so the router can render it when the route "/pastes/:id" is visited

{/* 

Conceptual Flow of this Component

User clicks "View" button in Paste page
        ↓
URL becomes  /pastes/<pasteId>
        ↓
React Router loads Viewpaste component
        ↓
useParams() extracts the id from URL
        ↓
Redux store provides all pastes
        ↓
Component finds paste with matching _id
        ↓
Title + Content displayed in read-only mode

  
  */}

