import React, { useState, useEffect } from 'react';
import '../styles/Card-exercise.css';
import { WorkoutStatsForm } from './WorkoutStatsForm';
import { useWorkout } from "../context/WorkoutContext";

export const FinalWorkoutView = ({ exercises }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setSelectedExercise, workoutData, selectedDay, setSelectedDay } = useWorkout();

  if (!exercises || exercises.length === 0) {
    return <p>No hay ejercicios para entrenar.</p>;
  }

  const currentExercise = exercises[currentIndex];

  useEffect(() => {
    setSelectedExercise(currentExercise.name);
  }, [currentIndex]);

  const handleSaveRoutine = () => {
    console.log("Rutina guardada:", workoutData);
    setSelectedDay(null);
  };

  const handleDiscardRoutine = () => {
    setSelectedDay(null);
  };

  return (
    <section className="container-final-workout-view">
      <div className="final-workout-view">
        <WorkoutStatsForm
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          exercises={exercises}
          onSaveRoutine={handleSaveRoutine}
          onDiscardRoutine={handleDiscardRoutine}
        />
      </div>
    </section>
  );
};