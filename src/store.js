import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice'

export default configureStore({ // creating and exporting the Redux store which acts as the central place where the entire application state is stored
  reducer: {
    paste: pasteReducer // registering the pasteReducer under the key "paste" so all paste-related state and logic are managed in state.paste
  }
})
