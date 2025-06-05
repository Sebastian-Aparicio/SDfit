import { useState, useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext";
import "../styles/stats-form.css";
import { FaArrowRight, FaSave, FaTrash } from "react-icons/fa";

export const WorkoutStatsForm = ({ currentIndex, setCurrentIndex, exercises, onSaveRoutine, onDiscardRoutine }) => {
  const { selectedExercise, selectedDay, workoutData, saveSeries } = useWorkout();

  const [repeticiones, setRepeticiones] = useState("");
  const [peso, setPeso] = useState("");
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    if (!selectedDay || !selectedExercise) {
      setSeriesData([]);
      return;
    }

    const formattedDate = selectedDay.toISOString().split("T")[0];
    const seriesEjercicio = workoutData[formattedDate]?.[selectedExercise] || [];
    setSeriesData(seriesEjercicio);
  }, [selectedExercise, selectedDay]);

  const handleGuardarSerie = () => {
    if (repeticiones === "" || peso === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevaSerie = {
      numero: seriesData.length + 1,
      repeticiones: Number(repeticiones),
      peso: Number(peso),
    };

    saveSeries(selectedExercise, nuevaSerie);

    setTimeout(() => {
      setSeriesData((prevSeries) => [...prevSeries, nuevaSerie]);
    }, 100);

    setRepeticiones("");
    setPeso("");
  };

  const handleNextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="workout-stats-form">
      <div className="form-section">
        <span className="titles-form">
          <h2>Registrar Series</h2>  
          <span className="info-select-form">Ejercicio:  <p > {selectedExercise}</p></span>
          
          <p>Número de Serie: <strong>{seriesData.length + 1}</strong></p>
        </span>

        <div className="container-input">
          <input type="number" value={repeticiones} onChange={(e) => setRepeticiones(e.target.value)} placeholder="Repeticiones" />
          <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Peso (kg)" />
        </div>

        <button className="button-series" onClick={handleGuardarSerie}>Guardar Serie</button>

        <div className="button-navigation">
          {currentIndex < exercises.length - 1 ? (
            <button className="button-next" onClick={handleNextExercise}>
              Siguiente ejercicio <FaArrowRight />
            </button>
          ) : (
            <>
              <button className="button-save" onClick={onSaveRoutine}>
                Guardar rutina <FaSave />
              </button>
              <button className="button-delete" onClick={onDiscardRoutine}>
                Eliminar rutina <FaTrash />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="series-registradas">
        <h3>Series registradas:</h3>
        {seriesData.length > 0 ? (
          <ul>
            {seriesData.map((serie, index) => (
              <li key={index}>
                Serie {serie.numero}: {serie.repeticiones} rep - {serie.peso} kg
              </li>
            ))}
          </ul>
        ) : (
          <p>No se han registrado series aún.</p>
        )}
      </div>
    </div>
  );
};