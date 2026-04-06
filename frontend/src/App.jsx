import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Navigate to="/login" />}  />
        <Route path="/login" element={<LoginPage/>}  />
        <Route path="/register" element={<RegisterPage />}  />
        <Route path="/dashboard" element={<PrivateRoute> <DashboardPage /> </PrivateRoute>}  />
       </Routes>
    </BrowserRouter>
  );
}

export default App;