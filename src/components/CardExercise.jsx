import "../styles/Card-exercise.css";
import { MdAdd, MdCheck } from "react-icons/md"; // Cambié MdClose por MdCheck

export const CardExercise = ({ exerciseSelect, handleSelectExercise, selectedExercises }) => {
  const isSelected = (exercise) => selectedExercises.some((ex) => ex.id === exercise.id);

  return (
    <div className="container-exercise">
      <h2>Seleccionar Ejercicios</h2>
      <div className="container-card">
        {exerciseSelect.map((exercise) => (
          <div key={exercise.id}>
            <li className={`card ${isSelected(exercise) ? "selected" : ""}`}>
              <img className="img-card" src="" alt="" />
              <span className="info-card">
                <h3>{exercise.name}</h3>
                <p>{exercise.muscleGroup}</p>
              </span>

              <button
                className={isSelected(exercise) ? "button-card-seleccionado" : "button-card"}
                onClick={() => handleSelectExercise(exercise)}
              >
                {isSelected(exercise) ? (
                  <>
                    <MdCheck size={20} /> Seleccionado
                  </>
                ) : (
                  <>
                    <MdAdd size={20} /> Seleccionar
                  </>
                )}
              </button>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};
