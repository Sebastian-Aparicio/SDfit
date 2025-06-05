import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Workout } from "./pages/Workout";
import { Statistics } from "./pages/Statistics";
import { Nutrition } from "./pages/Nutrition";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Workout" element={<Workout />} />
        <Route
          path="/Statistics"
          element={
             <ProtectedRoute>
           <Statistics />
             </ProtectedRoute>
          }
        />

       
        <Route path="/Nutrition" element={<Nutrition />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;