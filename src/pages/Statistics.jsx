import { useWorkout } from "../context/WorkoutContext";
import { HeaderComponent } from "../components/HeaderComponent";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { ExerciseStats } from "../components/ExerciseStats";
import { NutritionStats } from "../components/NutritionStats";
import "../styles/statistics.css";
import { BottomNav } from "../components/BottomNav";

export const Statistics = () => {
  const { workoutData, selectedDay, setSelectedDay } = useWorkout();
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nutritionData, setNutritionData] = useState(null);
  const [nutritionGoals, setNutritionGoals] = useState(null);
  const [isLoadingNutrition, setIsLoadingNutrition] = useState(false);

  const formattedDate = selectedDay
    ? selectedDay.toISOString().split("T")[0]
    : null;

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate)) {
      setSelectedDay(newDate);
      setSelectedSection(null);
      setSelectedExercise("");
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const fetchNutritionData = async () => {
      const user = auth.currentUser;
      if (!user || !formattedDate) return;

      try {
        setIsLoadingNutrition(true);
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const nutritionEntry = data.nutrition?.[formattedDate] || null;

          if (nutritionEntry) {
            // Nueva estructura con meals y goals
            if (nutritionEntry.meals && nutritionEntry.goals) {
              setNutritionData(nutritionEntry.meals);
              setNutritionGoals(nutritionEntry.goals);
            } else {
              // Antigua estructura
              setNutritionData(nutritionEntry);
              setNutritionGoals(null);
            }
          } else {
            setNutritionData(null);
            setNutritionGoals(null);
          }
        } else {
          setNutritionData(null);
          setNutritionGoals(null);
        }
      } catch (error) {
        console.error("Error al obtener datos de nutrición:", error);
        setNutritionData(null);
        setNutritionGoals(null);
      } finally {
        setIsLoadingNutrition(false);
      }
    };

    fetchNutritionData();
  }, [formattedDate]);

  const renderSelectionCards = () => (
    <div className="selection-cards">
      <div
        className={`card-option ${selectedSection === "entrenamiento" ? "selected" : ""}`}
        onClick={() => setSelectedSection("entrenamiento")}
      >
        Estadísticas de Entrenamiento
      </div>
      <div
        className={`card-option ${selectedSection === "nutricion" ? "selected" : ""}`}
        onClick={() => setSelectedSection("nutricion")}
      >
        Estadísticas de Nutrición
      </div>
    </div>
  );

  return (
    <>
      <HeaderComponent />
      <BottomNav />
      <section className="statistics">
        <div className="container-statistics">

          <span className="date-picker">
            <input
              className="custom-date-input"
              type="date"
              onChange={handleDateChange}
              value={formattedDate || ""}
            />
            {formattedDate && <h4>Día seleccionado: <p>{formattedDate}</p></h4>}
          </span>

          {!selectedSection && renderSelectionCards()}

          {selectedSection === "entrenamiento" && (
            <ExerciseStats
              workoutData={workoutData}
              formattedDate={formattedDate}
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setSelectedSection={setSelectedSection}
            />
          )}

          {selectedSection === "nutricion" && (
            <NutritionStats
              nutritionData={nutritionData}
              nutritionGoals={nutritionGoals}
              setSelectedSection={setSelectedSection}
              loading={isLoadingNutrition}
            />
          )}
        </div>
      </section>
    </>
  );
};