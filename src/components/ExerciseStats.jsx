import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { FaDumbbell, FaListAlt } from 'react-icons/fa';
import { FileX } from "lucide-react";

export const ExerciseStats = ({
  workoutData,
  formattedDate,
  selectedExercise,
  setSelectedExercise,
  currentIndex,
  setCurrentIndex,
  setSelectedSection
}) => {
  const dayData = formattedDate ? workoutData[formattedDate] : null;
  const exerciseList = dayData ? Object.entries(dayData) : [];

  const nextCard = () => {
    if (currentIndex < exerciseList.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const chartData = Object.entries(workoutData).map(([date, exercises]) => {
    const series = exercises[selectedExercise];
    if (Array.isArray(series) && series.length > 0) {
      const totalWeight = series.reduce((sum, serie) => sum + (serie.peso || 0), 0) / series.length;
      const maxWeight = Math.max(...series.map(serie => serie.peso || 0));
      const totalSeries = series.length;
      return { date, pesoPromedio: totalWeight, pesoMaximo: maxWeight, series: totalSeries };
    }
    return null;
  }).filter(Boolean);

  // 🔍 Resumen del día
  const exerciseSummary = useMemo(() => {
    if (!formattedDate || !workoutData[formattedDate]) return null;

    const exercises = workoutData[formattedDate];
    const totalExercises = Object.keys(exercises).length;

    let totalSeries = 0;
    Object.values(exercises).forEach(seriesArray => {
      totalSeries += seriesArray.length;
    });

    return { totalExercises, totalSeries };
  }, [formattedDate, workoutData]);

  return (
    <>
      <span>
        <button onClick={() => setSelectedSection(null)} className="back-btn">
          <ArrowLeft size={20} color="#8884d8" />
        </button>
      </span>

      {(!dayData || exerciseList.length === 0) && (
  <div className="flex flex-col items-center justify-center gap-2 text-center p-6 text-muted-foreground">
   <p className="text-no-date">
          No hay datos de entrenamiento disponibles para mostrar.</p>
          <FileX className="w-8 h-8 text-muted-foreground" color="red" size={40} />
  </div>
)}

      {exerciseSummary && (
        <div className="exercise-summary-container">
          <div className="exercise-summary-card">
   
      <p><FaDumbbell /> <strong>Ejercicios realizados:</strong> {exerciseSummary.totalExercises || 0}</p>
      <p><FaListAlt /> <strong>Total de series:</strong> {exerciseSummary.totalSeries || 0}</p>
    </div>
        </div>
      )}

      <div className="carousel-container">
        <button className="carousel-btn left" onClick={prevCard}>&lt;</button>
        <ul className="container-card-statistics">
          {exerciseList.slice(currentIndex, currentIndex + 4).map(([exercise, series]) => (
            <li
              key={exercise}
              className={`list-card-statistics ${selectedExercise === exercise ? "selected" : ""}`}
              onClick={() => setSelectedExercise(exercise)}>
              <h3>{exercise}</h3>
              <ul className="container-list-series">
                {Array.isArray(series) && series.map((serie, i) => (
                  <li className="list-series" key={i}>
                    <p className="serie">Serie {i + 1}:</p>
                    <p className="reps">{serie.repeticiones} Rep - {serie.peso} kg</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button className="carousel-btn right" onClick={nextCard}>&gt;</button>
      </div>

      {selectedExercise && chartData.length > 0 && (
        <div style={{ width: "100%", height: 350, margin: "0 auto" }}>
          <h3 className="title-graphs">Progresión de: <p className="exercise-graphs">{selectedExercise}</p></h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "8px", color: "#fff", border: "1px solid #8884d8" }} />
              <Legend />
              <Line type="monotone" dataKey="pesoPromedio" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} name="Peso Promedio" />
              <Line type="monotone" dataKey="pesoMaximo" stroke="#82ca9d" strokeWidth={3} dot={{ r: 5 }} name="Peso Máximo" />
              <Line type="monotone" dataKey="series" stroke="#FF5733" strokeWidth={3} dot={{ r: 5 }} name="Series" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};