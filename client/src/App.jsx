import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./utils/ProtectedRoute";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard"
               element={
                <ProtectedRoute>
                  <DashBoard/>
                </ProtectedRoute>
               } />
      </Routes>
    </BrowserRouter>
  )
}