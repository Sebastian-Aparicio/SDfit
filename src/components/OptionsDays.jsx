import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/option-days.css";
import { OptionsMuscles } from "./OptionsMuscles";
import { FitnessTips } from "./FitnessTips";
import { useWorkout } from "../context/WorkoutContext"; // Importamos el contexto

export const OptionsDays = () => {
  const { selectedDay, setSelectedDay } = useWorkout(); // Usamos el contexto

  const handleSelectDay = (date) => {
    setSelectedDay(date);
    
  };

  return (
    <>
      {!selectedDay ? (
        <section className="days">
          <div className="container-days">
            <span className="container-days-title">
              <h2 className="title-one">Elige el día</h2>
              <h2 className="title-two">
                en el que deseas entrenar para personalizar tu rutina. ¡Tu
                progreso comienza con una buena planificación!
              </h2>
            </span>
            <Calendar onChange={handleSelectDay} value={selectedDay} locale="en-US" />
          </div>
          <div className="container-tips">
            <FitnessTips />
          </div>
        </section>
      ) : (
        <OptionsMuscles />
      )}
    </>
  );
};