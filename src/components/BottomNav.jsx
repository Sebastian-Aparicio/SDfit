import { Home, Dumbbell, Apple, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

export const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate('/')} className="nav-button">
        <Home size={24} />
        <span>Home</span>
      </button>
      <button onClick={() => navigate('/Workout')} className="nav-button">
        <Dumbbell size={24} />
        <span>Workout</span>
      </button>
      <button onClick={() => navigate('/Nutrition')} className="nav-button">
        <Apple size={24} />
        <span>Nutrición</span>
      </button>
      <button onClick={() => navigate('/Statistics')} className="nav-button">
        <BarChart2 size={24} />
        <span>Stats</span>
      </button>
    </nav>
  );
};
