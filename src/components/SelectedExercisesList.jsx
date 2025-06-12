import "../styles/card-exercise.css";

export const SelectedExercisesList = ({
  selectedExercises,
  orderedExercises,
  handleCardClick,
  handleSelectExercise,
}) => {
  return (
    <div className="container-list-exercise">
  <h3 className="title-container-list">Ordena tus Ejercicios</h3>
  <div className="list-exercise">
    {selectedExercises.length > 0 ? (
      selectedExercises.map((exercise) => {
        const orderIndex = orderedExercises.findIndex(
          (ex) => ex.id === exercise.id
        );
        const isOrdered = orderIndex !== -1;
        return (
          <div
            key={exercise.id}
            className={`card ${isOrdered ? "ordered" : ""}`}
            onClick={() => handleCardClick(exercise)}
          >
            <h3>{exercise.name}</h3>
            {isOrdered && <span className="order-indicator">{orderIndex + 1}</span>}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectExercise(exercise);
              }}
            >
              ❌ Quitar
            </button>
          </div>
        );
      })
    ) : (
      <div className="text-order-card">

        <p> No has seleccionado ejercicios aún.</p>
      </div>

    
    )}
  </div>
</div>
  );
};