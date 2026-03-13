# 📋 PasteApp

PasteApp is a **single-page React application** that allows users to **create, edit, view, search, copy, and delete text pastes**.
The application demonstrates **modern React architecture** using **Redux Toolkit for global state management**, **React Router for navigation**, and **localStorage for persistence**.

The goal of this project is to show how a frontend application can manage **dynamic data, routing, and persistent state** without a backend.

---

# 🎯 Project Objective

The primary objective of this project is to demonstrate:

* Component-based UI architecture in React
* Global state management using Redux Toolkit
* Client-side routing using React Router
* Data persistence using browser localStorage
* Interaction with browser APIs (Clipboard API)
* Modern frontend workflow using Vite

This project serves as a **practical example of a small-scale CRUD application** where users can create, read, update, and delete data entirely on the client side.

---

# 🧱 Technology Stack

| Technology           | Purpose                                    |
| -------------------- | ------------------------------------------ |
| **React**            | UI component rendering                     |
| **Redux Toolkit**    | Global state management                    |
| **React Redux**      | Connecting React components to Redux store |
| **React Router DOM** | Client-side navigation                     |
| **React Toastify**   | Notification system                        |
| **Tailwind CSS**     | UI styling                                 |
| **Vite**             | Development build tool                     |
| **LocalStorage API** | Data persistence                           |

---

# 📂 Project Structure

```
pasteapp
│
├── node_modules
├── public
│
├── src
│   │
│   ├── assets
│   │
│   ├── components
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── Paste.jsx
│   │   └── Viewpaste.jsx
│   │
│   ├── redux
│   │   └── pasteSlice.js
│   │
│   ├── store.js
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
│
├── index.html
├── package.json
└── README.md
```

---

# ⚙️ Application Architecture

The application follows a **unidirectional data flow architecture**.

```
React Components
        ↓
Dispatch Redux Actions
        ↓
Redux Reducers Update State
        ↓
Redux Store Updates
        ↓
UI Re-renders Automatically
```

This ensures predictable data flow and easier debugging.

---

# 🚀 Application Initialization Flow

When the application starts, the following process occurs:

```
index.html loads
        ↓
main.jsx executes
        ↓
ReactDOM mounts the React application
        ↓
Redux Provider supplies global store
        ↓
React Router initializes routes
        ↓
App component renders
```

### main.jsx

The entry point of the application performs these tasks:

* Mounts the React application to the DOM
* Wraps the app with Redux `Provider`
* Enables toast notifications

```
createRoot(...).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>
)
```

---

# 🔄 Routing System

The application uses **React Router DOM** for navigation.

Routes are defined inside `App.jsx`.

| Route         | Component | Purpose                |
| ------------- | --------- | ---------------------- |
| `/`           | Home      | Create or edit a paste |
| `/pastes`     | Paste     | Display all pastes     |
| `/pastes/:id` | Viewpaste | View a single paste    |

### Routing Flow

```
User navigates to URL
        ↓
React Router matches route
        ↓
Corresponding component renders
```

Example:

```
/pastes/abc123
        ↓
Viewpaste.jsx loads
        ↓
Paste with id "abc123" is displayed
```

---

# 🗃️ State Management with Redux

Redux is responsible for managing **all paste-related data**.

The global state structure:

```
state = {
  paste: {
    pastes: []
  }
}
```

This state is controlled by **pasteSlice.js**.

---

# 🧠 pasteSlice (Redux Logic)

The slice contains:

* Initial state
* Reducers
* Actions

Reducers modify the state based on dispatched actions.

### Initial State

```
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}
```

When the app starts:

```
Check localStorage
        ↓
If data exists → load it
If not → start with empty array
```

This allows pastes to persist across page refresh.

---

# ✏️ Creating a Paste

Users create pastes in the **Home component**.

Flow:

```
User enters title and content
        ↓
Click "Create Paste"
        ↓
createPaste() executes
        ↓
dispatch(addtoPaste)
        ↓
Redux reducer adds paste to state
        ↓
localStorage updated
        ↓
Toast notification displayed
```

Each paste object contains:

```
{
  _id: unique_id,
  title: string,
  content: string,
  createdAt: timestamp
}
```

---

# 📝 Editing a Paste

Editing is enabled using **URL query parameters**.

When the user clicks **Edit**:

```
/?paseId=<id>
```

Flow:

```
Home component loads
        ↓
useSearchParams() extracts pasteId
        ↓
Redux store searched
        ↓
Matching paste loaded
        ↓
Inputs automatically filled
```

After editing:

```
dispatch(updatetoPaste)
        ↓
Redux updates paste
        ↓
localStorage updated
```

---

# 👁️ Viewing a Paste

Viewing occurs in the **Viewpaste component**.

```
User clicks "View"
        ↓
Navigate to /pastes/<id>
        ↓
useParams() extracts id
        ↓
Redux store searched
        ↓
Matching paste retrieved
        ↓
Displayed in read-only mode
```

---

# 🔍 Searching Pastes

The Paste page provides real-time search functionality.

```
User types in search input
        ↓
searchTerm state updates
        ↓
pastes.filter() runs
        ↓
Matching titles returned
        ↓
Filtered pastes displayed
```

Filtering is case-insensitive.

---

# 🗑️ Deleting a Paste

When the user clicks delete:

```
handleDelete(pasteId)
        ↓
dispatch(removeFromPaste)
        ↓
Redux reducer runs
        ↓
paste removed from state
        ↓
localStorage updated
        ↓
UI re-renders automatically
```

---

# 📋 Clipboard Copy Feature

The app uses the **Clipboard API**.

```
navigator.clipboard.writeText(paste.content)
```

Flow:

```
User clicks Copy
        ↓
Content copied to clipboard
        ↓
Toast notification appears
```

---

# 💾 Data Persistence

The application uses **localStorage** to save data.

```
localStorage.setItem("pastes", JSON.stringify(state.pastes))
```

On refresh:

```
Redux initialState
        ↓
Reads localStorage
        ↓
Loads stored pastes
```

This ensures the data is not lost after reload.

---

# 🎨 User Interface

The UI uses **Tailwind CSS** for styling.

Key UI features include:

* Responsive layout
* Card-based paste display
* Clean form interface
* Interactive buttons
* Hover animations

---

# 🔔 Notification System

React Toastify provides notifications for:

* Paste creation
* Paste update
* Paste deletion
* Clipboard copy

Toast messages provide feedback for user actions.

---

# ▶️ Running the Project

### Clone the repository

```
git clone https://github.com/yourusername/pasteapp.git
```

### Navigate to project folder

```
cd pasteapp
```

### Install dependencies

```
npm install
```

### Start development server

```
npm run dev
```

---

# 🌍 Example Application Flow

```
User opens application
        ↓
Home page loads
        ↓
User creates a paste
        ↓
Paste stored in Redux + localStorage
        ↓
User navigates to /pastes
        ↓
All pastes displayed
        ↓
User searches, edits, views, copies, or deletes
```

---

# 📌 Future Improvements

Potential features that could enhance this project:

* Syntax highlighting for code pastes
* Backend database integration
* User authentication
* Shareable public paste links
* Dark mode
* Paste expiration feature
* Cloud synchronization

---

# 👨‍💻 Author

**Hardik Jaiswal**

B.Tech Computer Science Student
