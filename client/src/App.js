import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Navigate
} from "react-router-dom";

import { v4 as uuidV4 } from "uuid"
import TextEditor from './TextEditor'


function App() {
  return (
    <Router>
  <Routes>
  <Route  path="/" element={<Navigate to={`/documents/${uuidV4()}`} />}></Route>
  <Route   path="/documents/:id" element={<TextEditor/>}></Route>
</Routes> 
</Router>
      
  )
}

export default App;
