import { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const WorkoutContext = createContext();
export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState(() => {
    const savedDay = localStorage.getItem("selectedDay");
    return savedDay ? new Date(savedDay) : null;
  });

  const [selectedExercise, setSelectedExercise] = useState(() => {
    return localStorage.getItem("selectedExercise") || null;
  });

  const [workoutData, setWorkoutData] = useState({});
  const [nutritionData, setNutritionData] = useState({});
  const [workoutStep, setWorkoutStep] = useState(() => {
    return localStorage.getItem("workoutStep") || "selectDay";
  });

  const user = auth.currentUser;

  useEffect(() => {
    if (selectedDay) {
      localStorage.setItem("selectedDay", selectedDay.toISOString());
    }
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem("selectedExercise", selectedExercise);
  }, [selectedExercise]);

  useEffect(() => {
    localStorage.setItem("workoutStep", workoutStep);
    console.log("Paso actual de entrenamiento:", workoutStep);
  }, [workoutStep]);

  useEffect(() => {
    if (!user || !selectedDay) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setWorkoutData(data.workouts || {});
          setNutritionData(data.nutrition || {});
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [user, selectedDay]);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("selectedDay");
      localStorage.removeItem("selectedExercise");
      localStorage.removeItem("workoutStep");
      setSelectedDay(null);
      setSelectedExercise(null);
      setWorkoutStep("selectDay");
    }
  }, [user]);

  const saveSeries = async (exercise, series) => {
    if (!selectedDay || !exercise || !user) return;

    const formattedDate = selectedDay.toISOString().split("T")[0];
    const userWorkoutRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userWorkoutRef, {
        [`workouts.${formattedDate}.${exercise}`]: [
          ...(workoutData[formattedDate]?.[exercise] || []),
          series
        ]
      });

      setWorkoutData(prevData => ({
        ...prevData,
        [formattedDate]: {
          ...(prevData[formattedDate] || {}),
          [exercise]: [...(prevData[formattedDate]?.[exercise] || []), series]
        }
      }));
    } catch (error) {
      console.error("Error guardando la serie:", error);
    }
  };

  const saveNutrition = async (mealName, foods) => {
    if (!selectedDay || !user || !mealName || foods.length === 0) return;

    const formattedDate = selectedDay.toISOString().split("T")[0];
    const userRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userRef, {
        [`nutrition.${formattedDate}.${mealName}`]: foods
      });

      setNutritionData(prevData => ({
        ...prevData,
        [formattedDate]: {
          ...(prevData[formattedDate] || {}),
          [mealName]: foods
        }
      }));
    } catch (error) {
      console.error("Error guardando la comida:", error);
    }
  };

  const changeExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setWorkoutStep("selectMuscles");
    setSelectedExercise(null);
    localStorage.setItem("workoutStep", "selectMuscles");
    localStorage.setItem("selectedExercise", "");
  };

  return (
    <WorkoutContext.Provider
      value={{
        selectedDay,
        setSelectedDay: handleDaySelection,
        selectedExercise,
        setSelectedExercise,
        workoutData,
        nutritionData,
        saveSeries,
        saveNutrition,
        changeExercise,
        workoutStep,
        setWorkoutStep,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
