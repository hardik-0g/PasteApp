import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render( // mounting the entire React application into the HTML element with id="root" so React can control everything inside it
  <StrictMode> {/*React development tool that helps detect unsafe lifecycle methods and potential bugs during development*/} 
    <Provider store={store}> {/*making the Redux store available to all components in the app so they can access global state using useSelector and modify it using useDispatch*/} 
      <App /> {/*main root component that contains routing and loads all pages like Home, Paste, and Viewpaste*/} 
      <ToastContainer /> {/*global container required by react-toastify to display toast notifications triggered anywhere in the app*/} 
    </Provider>
  </StrictMode>
)
