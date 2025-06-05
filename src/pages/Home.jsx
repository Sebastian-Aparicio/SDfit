import { HeaderComponent } from "../components/HeaderComponent";
import { Login } from "../components/Login";
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { motion } from "framer-motion";
import { FaDumbbell, FaChartLine, FaAppleAlt } from "react-icons/fa";
import "../styles/home.css";
import { BottomNav } from "../components/BottomNav";

export const Home = () => {
  const { user, logout } = useAuth(); // Obtén el usuario autenticado

  return (
    <>
      <HeaderComponent />
      <BottomNav />

      <section className="home  ">
        {user ? (
          // **Contenido para usuario autenticado**
          <div className="home-container home-logado">

            <span className="info-logado">
               <span className="card-logado">
              <div className="card-border-top">
  </div>
                   <span className="card-info-logado">

            <h2>Bienvenido, <p>{user.displayName}!</p> </h2>
            <img src={user.photoURL} alt="Avatar" width="80" />
               </span>
                   </span>
            <button onClick={logout} className="signin">
    Cerrar sesión
  </button>
            <p>Explora las secciones de la app para mejorar tu entrenamiento:</p>

            </span>
            
            <div className="features features-logado">
              <motion.div
                className="feature"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <FaDumbbell className="icon" />
                <span className="feature-info">
                  <h3>Workout</h3>
                  <p>Crea y sigue rutinas personalizadas.</p>
                </span>
              </motion.div>

              <motion.div
                className="feature"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FaChartLine className="icon" />
                <span className="feature-info">
                  <h3>Statistics</h3>
                  <p>Revisa tu progreso con gráficas detalladas.</p>
                </span>
              </motion.div>

              <motion.div
                className="feature"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <FaAppleAlt className="icon" />
                <span className="feature-info">
                  <h3>Nutrition</h3>
                  <p>Planifica y lleva control de tu alimentación.</p>
                </span>
              </motion.div>
            </div>
          </div>
        ) : (
          // **Contenido para usuario no autenticado**
          <div className="home-container">
            <motion.span
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >

            <div className="info-login">

  <h1 className="title">Tu entrenamiento, tu progreso, tu mejor versión</h1>
              <p className="description">
                <span className="title-sdfit">SDfit</span> te ayuda a planificar, registrar y analizar tu progreso fitness con entrenamientos personalizados.
              </p>
            </div>

 


            
            </motion.span>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Login />
            </motion.div>

            <div className="features">
              <motion.div
                className="feature"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <FaDumbbell className="icon" />
                <span className="feature-info">
                  <h3>Entrenamientos personalizados</h3>
                  <p>Diseña rutinas a tu medida y alcanza tus objetivos.</p>
                </span>
              </motion.div>

              <motion.div
                className="feature"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FaChartLine className="icon" />
                <span className="feature-info">
                  <h3>Estadísticas detalladas</h3>
                  <p>Visualiza tu progreso con gráficas interactivas.</p>
                </span>
              </motion.div>

              <motion.div
                className="feature"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <FaAppleAlt className="icon" />
                <span className="feature-info">
                  <h3>Nutrición</h3>
                  <p>Lleva un seguimiento de tu alimentación diaria.</p>
                </span>
              </motion.div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};