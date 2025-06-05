import { useAuth } from "../context/AuthContext";
import { HeaderComponent } from "./HeaderComponent";  
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
      
      <HeaderComponent />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>🔒 Acceso restringido</h2>
        <p>Debes iniciar sesión para ver esta sección.</p>
      </div>
      </>
    );
  }

  return children;
};