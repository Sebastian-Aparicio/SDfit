import { useState, useEffect } from "react";
import exercises from "../data/dataExercise";
import { CardExercise } from "./CardExercise";
import { SelectedExercisesList } from "./SelectedExercisesList";
import { FinalWorkoutView } from "./FinalWorkoutView";
import "../styles/option-muscles.css";
import { BodyIcon1 } from "./BodyIcon1";
import pectoralesImg from "../assets/pectorales.png";
import espaldaImg from "../assets/espalda.png";
import hombrosImg from "../assets/hombros.png";
import bicepsImg from "../assets/biceps.png";
import tricepsImg from "../assets/triceps.png";
import abdominalesImg from "../assets/abdominales.png";
import cuadricepsImg from "../assets/cuadriceps.png";
import gluteosImg from "../assets/gluteos.png";
import pantorrillasImg from "../assets/pantorrillas.png";
import isquiotibialesImg from "../assets/isquiotibiales.png";
import antebrazosImg from "../assets/antebrazos.png";
import { useWorkout } from "../context/WorkoutContext";
import { ArrowLeft } from "lucide-react";


export const OptionsMuscles = () => {
  const muscles = [
  {
    id: 1,
    namemuscle: "Pectorales",
    imageSrc: pectoralesImg,
    position: { top: "12.2%", left: "14%" },
    size: { width: "78%", height: "100%" },
    buttonSize: { top: "19%", left: "32%", width: "12%", height: "7%" },
    mobilePosition: { top: "12.7%", left: "2%" },
    mobileSize: { width: "23.5rem", height: "100%" },
    mobileButtonSize: { top: "18%", left: "40%", width: "18%", height: "8%" }
  },
  {
    id: 2,
    namemuscle: "Espalda",
    imageSrc: espaldaImg,
    position: { top: "11.5%", left: "13.5%" },
    size: { width: "80%", height: "100%" },
    buttonSize: { top: "23%", left: "26%", width: "5%", height: "10%" },
    mobilePosition: { top: "12.4%", left: "0.8%" },
    mobileSize: { width: "24rem", height: "100%" },
    mobileButtonSize: { top: "23%", left: "32%", width: "8%", height: "9%",  }
  },
  {
    id: 3,
    namemuscle: "Hombros",
    imageSrc: hombrosImg,
    position: { top: "12%", left: "13.5%" },
    size: { width: "80%", height: "100%" },
    buttonSize: { top: "13.5%", left: "24%", width: "7.5%", height: "3%" },
    mobilePosition: { top: "12%", left: "0%" },
    mobileSize: { width: "24.5rem", height: "100%" },
    mobileButtonSize: { top: "13.5%", left: "31%", width: "8%", height: "3%" }
  },
  {
    id: 4,
    namemuscle: "Bíceps",
    imageSrc: bicepsImg,
    position: { top: "11.8%", left: "13.5%" },
    size: { width: "80%", height: "100%" },
    buttonSize: { top: "18%", left: "51%", width: "7%", height: "5.5%" },
    mobilePosition: { top: "11.5%", left: "-2%" },
    mobileSize: { width: "25.5rem", height: "100%" },
    mobileButtonSize: { top: "17%", left: "62%", width: "9%", height: "7%" }
  },
  {
    id: 5,
    namemuscle: "Tríceps",
    imageSrc: tricepsImg,
    position: { top: "12%", left: "13.7%" },
    size: { width: "80%", height: "80%" },
    buttonSize: { top: "24%", left: "50%", width: "9%", height: "4%" },
    mobilePosition: { top: "12.7%", left: "2%" },
    mobileSize: { width: "23.5rem", height: "80%" },
    mobileButtonSize: { top: "20%", left: "21%", width: "12%", height: "5%" }
  },
  {
    id: 6,
    namemuscle: "Abdominales",
    imageSrc: abdominalesImg,
    position: { top: "12%", left: "13.5%" },
    size: { width: "80%", height: "100%" },
    buttonSize: { top: "29%", left: "32%", width: "12%", height: "10%" },
    mobilePosition: { top: "13.2%", left: "2.8%" },
    mobileSize: { width: "23rem", height: "100%" },
    mobileButtonSize: { top: "29%", left: "40%", width: "14%", height: "14%" }
  },
  {
    id: 7,
    namemuscle: "Antebrazos",
    imageSrc: antebrazosImg,
    position: { top: "12%", left: "13.5%" },
    size: { width: "80%", height: "100%" },
    buttonSize: { top: "12%", left: "13.5%", width: "5.5%", height: "9%" },
    mobilePosition: { top: "12%", left: "1%" },
    mobileSize: { width: "24rem", height: "100%" },
    mobileButtonSize: { top: "10%", left: "16%", width: "8%", height: "11%" }
  },
  {
    id: 8,
    namemuscle: "Cuádriceps",
    imageSrc: cuadricepsImg,
    position: { top: "11.5%", left: "13.5%" },
    size: { width: "80%", height: "100%" },
    buttonSize: { top: "49%", left: "40%", width: "8%", height: "13%" },
    mobilePosition: { top: "11.5%", left: "-1%" },
    mobileSize: { width: "25rem", height: "100%" },
    mobileButtonSize: { top: "50%", left: "50%", width: "12%", height: "12%" }
  },
  {
    id: 9,
    namemuscle: "Isquiotibiales",
    imageSrc: isquiotibialesImg,
    position: { top: "11%", left: "13.5%" },
    size: { width: "80%", height: "100%" },
    buttonSize: { top: "59%", left: "31%", width: "9%", height: "10%", BorderRadius: "25%" },
    mobilePosition: { top: "8.5%", left: "-3.5%" },
    mobileSize: { width: "26.5rem", height: "100%" },
    mobileButtonSize: { top: "59%", left: "39%", width: "5%", height: "8%", BorderRadius: "25%" }
  },
  {
    id: 10,
    namemuscle: "Glúteos",
    imageSrc: gluteosImg,
    position: { top: "14%", left: "14.5%" },
    size: { width: "75%", height: "100%" },
    buttonSize: { top: "45%", left: "26.5%", width: "10%", height: "13%", BorderRadius: "25%" },
    mobilePosition: { top: "13.8%", left: "2.1%" },
    mobileSize: { width: "23rem", height: "100%" },
    mobileButtonSize: { top: "43%", left: "37%", width: "12%", height: "14%", BorderRadius: "25%" }
  },
  {
    id: 11,
    namemuscle: "Pantorrillas",
    imageSrc: pantorrillasImg,
    position: { top: "12%", left: "13.4%" },
    size: { width: "80%", height: "100%" },
    buttonSize: { top: "72%", left: "26%", width: "8%", height: "10%" },
    mobilePosition: { top: "11%", left: "-1.6%" },
    mobileSize: { width: "25rem", height: "100%" },
    mobileButtonSize: { top: "72%", left: "34%", width: "8%", height: "10%" }
  }
  ]
const { setSelectedDay } = useWorkout();

  const handleGoBack = () => {
    setSelectedDay(null); // Esto hará que se muestre nuevamente el calendario
  };
  const [selectMuscle, setSelectMuscle] = useState([]);
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showExercises, setShowExercises] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [startWorkout, setStartWorkout] = useState(false);
  const [orderedExercises, setOrderedExercises] = useState([]);
  const [showOrderWarning, setShowOrderWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  handleResize(); // se ejecuta al cargar
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);


  const handleStartWorkout = () => {
  if (orderedExercises.length === 0) {
    setShowOrderWarning(true);
  } else {
    setShowOrderWarning(false);
    setStartWorkout(true);
  }
};

  const handleSelectMuscle = (muscle) => {
    setSelectMuscle((prev) =>
      prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]
    );
   
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercises((prev) =>
      prev.some((ex) => ex.id === exercise.id)
        ? prev.filter((ex) => ex.id !== exercise.id)
        : [...prev, exercise]
    );
  };

  const handleCardClick = (exercise) => {
    setOrderedExercises((prev) =>
      prev.some((ex) => ex.id === exercise.id)
        ? prev.filter((ex) => ex.id !== exercise.id)
        : [...prev, exercise]
    );
  };

  const filteredExercises = exercises.filter((exercise) =>
    selectMuscle.includes(exercise.muscleGroup)
  );

  if (startWorkout) {
    return (
      <div className="workout-view">
        <FinalWorkoutView exercises={orderedExercises} />
      </div>
    );
  }

  return (
    <section className="muscle-selection">
     

      {!showExercises && (
        <div className="container-muscle-selection">
          <BodyIcon1 />
       {muscles.map((muscle) => {
  // Elige la posición y tamaños según si es móvil o no
  const position = isMobile && muscle.mobilePosition ? muscle.mobilePosition : muscle.position;
  const size = isMobile && muscle.mobileSize ? muscle.mobileSize : muscle.size;
  const buttonSize = isMobile && muscle.mobileButtonSize ? muscle.mobileButtonSize : muscle.buttonSize;

  return (
    <div
      key={muscle.id}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      <img
        src={muscle.imageSrc}
        alt={muscle.namemuscle}
        className="muscle-image"
        style={{
          opacity:
            selectMuscle.includes(muscle.namemuscle) ||
            hoveredMuscle === muscle.namemuscle
              ? 1
              : 0,
          width: size.width,
          height: size.height,
          filter:
            selectMuscle.includes(muscle.namemuscle) ||
            hoveredMuscle === muscle.namemuscle
              ? "drop-shadow(0px 0px 3px rgba(255, 215, 0, 0.8)) brightness(1.2) contrast(1.1)"
              : "none",
          transition: "filter 0.3s ease-in-out, opacity 0.3s ease-in-out",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <button
        onClick={() => handleSelectMuscle(muscle.namemuscle)}
        onMouseEnter={() => {
          setHoveredMuscle(muscle.namemuscle);
          setTooltipText(muscle.namemuscle);
        }}
        onMouseMove={(e) => {
          setTooltipPosition({ x: e.clientX + 15, y: e.clientY + 15 });
        }}
        onMouseLeave={() => {
          setHoveredMuscle(null);
          setTooltipText("");
        }}
        className="muscle-button"
        style={{
          position: "absolute",
          top: buttonSize.top,
          left: buttonSize.left,
          width: buttonSize.width,
          height: buttonSize.height,
          borderRadius: buttonSize.borderRadius,
          opacity: 0,
          cursor: "pointer",
          zIndex: 10,
        }}
      />
    </div>
  );
})}

          {/* Tooltip dinámico */}
          {tooltipText && (
            <div
              style={{
                position: "absolute",
                top: tooltipPosition.y,
                left: tooltipPosition.x,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: "5px",
                fontSize: "14px",
                pointerEvents: "none",
                zIndex: 1000,
              }}
            >
              {tooltipText}
            </div>
          )}
          <div className="container-musclet-tile">
             



      <button onClick={handleGoBack} className="go-back-btn1">
        <ArrowLeft size={40} color="#155a8a" />
      </button>
      
            <p className="musclet-title">Selecciona los músculos que entrenarás hoy</p>
            <div className="selected-muscles">
              {selectMuscle.map((muscle, index) => (
                <span key={index} className="selected-muscle">{muscle}</span>
              ))}
            </div>

            {selectMuscle.length > 0 && (
              <button  className="button-render"   onClick={() => setShowExercises(true)}>
                < span className="transition"></span>
                <span className="gradient"></span>
                <span className="label">Mostrar Ejercicios</span>
              </button>
            )}
          </div>
        </div>
      )}

      {showExercises && (
        <section className="card-list">
          <CardExercise
            exerciseSelect={filteredExercises}
            handleSelectExercise={handleSelectExercise}
            selectedExercises={selectedExercises}
          />
          <SelectedExercisesList
            selectedExercises={selectedExercises}
            orderedExercises={orderedExercises}
            handleCardClick={handleCardClick}
            handleSelectExercise={handleSelectExercise}
          />
          {selectedExercises.length > 0 && (
            <div className="container-buttons">

              <button className="button-render go-work" onClick={handleStartWorkout}>
  <span className="transition"></span>
  <span className="gradient"></span>
  <span className="label">Ir a entrenar</span>
</button>



            </div>
          )}

              {showOrderWarning && (
            <p  className= "title-none"
             
            >
              Por favor, ordena tus ejercicios antes de continuar.
            </p>
          )}
        </section>
      )}
    </section>
  );
};