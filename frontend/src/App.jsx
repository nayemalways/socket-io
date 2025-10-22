 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./page/Signup";
import { Login } from "./page/Login";
import { Chatpage } from "./page/Chatpage";
 
 
// Access server token
const token = localStorage.getItem("token");

const App = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={token ? <Chatpage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;