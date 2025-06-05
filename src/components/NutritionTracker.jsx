import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/nutrition-tracker.css';
import { Drumstick, Wheat, Droplet, Flame } from 'lucide-react';

export const NutritionTracker = () => {
  const [meals, setMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [goals, setGoals] = useState({ protein: '', carbs: '', fats: '', calories: '' });
  const [goalsSaved, setGoalsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchNutritionData = async () => {
      const user = auth.currentUser;
      if (!user || !selectedDate) return;

      try {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const nutritionForDate = data.nutrition?.[selectedDate] || {};
          setMeals(nutritionForDate.meals || []);
          setGoals(nutritionForDate.goals || { protein: '', carbs: '', fats: '', calories: '' });

          const hasGoals = nutritionForDate.goals &&
            nutritionForDate.goals.protein &&
            nutritionForDate.goals.carbs &&
            nutritionForDate.goals.fats &&
            nutritionForDate.goals.calories;

          setGoalsSaved(hasGoals);
        }
      } catch (error) {
        console.error("Error al obtener datos de nutrición:", error);
      }
    };

    fetchNutritionData();
  }, [selectedDate]);

  const handleSaveGoals = async () => {
    const user = auth.currentUser;
    if (!user || !selectedDate) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      const currentData = docSnap.exists() ? docSnap.data() : {};

      const updatedNutrition = {
        ...(currentData.nutrition || {}),
        [selectedDate]: {
          ...(currentData.nutrition?.[selectedDate] || {}),
          goals,
        }
      };

      await setDoc(userRef, {
        ...currentData,
        nutrition: updatedNutrition
      });

      setGoalsSaved(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error al guardar objetivos:", error);
    }
  };

  const addMeal = () => {
    setMeals([...meals, { name: `Comida ${meals.length + 1}`, foods: [] }]);
  };

  const addFoodToMeal = (mealIndex, food) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].foods.push(food);
    setMeals(updatedMeals);
  };

  const saveMeals = async () => {
    const user = auth.currentUser;
    if (!user || !selectedDate) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      const currentData = docSnap.exists() ? docSnap.data() : {};

      const updatedData = {
        ...currentData,
        nutrition: {
          ...(currentData.nutrition || {}),
          [selectedDate]: {
            goals,
            meals
          }
        }
      };

      await setDoc(userRef, updatedData);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reset
      setSelectedDate(null);
      setGoalsSaved(false);
      setMeals([]);
      setGoals({ protein: '', carbs: '', fats: '', calories: '' });

    } catch (error) {
      console.error("Error al guardar datos de nutrición:", error);
    }
  };

  const totalCalories = meals.reduce((dayTotal, meal) => {
    return dayTotal + meal.foods.reduce((mealTotal, food) => {
      return mealTotal + (Number(food.calories) || 0);
    }, 0);
  }, 0);

  const totalMacros = meals.reduce((totals, meal) => {
    return meal.foods.reduce((t, food) => {
      t.protein += Number(food.protein) || 0;
      t.carbs += Number(food.carbs) || 0;
      t.fats += Number(food.fats) || 0;
      return t;
    }, totals);
  }, { protein: 0, carbs: 0, fats: 0 });

  return (
    <div className={
      !selectedDate
        ? "container-form-date"
        : goalsSaved
          ? "nutrition-container-meals"
          : "nutrition-container"
    }>
      <h1>Seguimiento Nutricional</h1>

      {showToast && <div className="toast">✅ Guardado exitosamente</div>}

      {!selectedDate ? (
        <div className="date-picker-label">
          <label>Selecciona el día:
            <input
              className="custom-date-input"
              type="date"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>
        </div>
      ) : !goalsSaved ? (
        <>
          <div className="date-header">
            <h2>Día seleccionado: {selectedDate}</h2>
            <button onClick={() => setSelectedDate(null)}>⬅ Cambiar día</button>
          </div>
          <div className="goal-inputs">
            <input type="number" placeholder="Proteínas (g)" value={goals.protein}  required onChange={(e) => setGoals({ ...goals, protein: e.target.value })} />
            <input type="number" placeholder="Carbohidratos (g)" value={goals.carbs} onChange={(e) => setGoals({ ...goals, carbs: e.target.value })} />
            <input type="number" placeholder="Grasas (g)" value={goals.fats} onChange={(e) => setGoals({ ...goals, fats: e.target.value })} />
            <input type="number" placeholder="Calorías (kcal)" value={goals.calories} onChange={(e) => setGoals({ ...goals, calories: e.target.value })} />
            <button className="save-button" onClick={handleSaveGoals}>💾 Guardar objetivos</button>
          </div>
        </>
      ) : (
        <>
          <div className="date-header">
            <h2>Día seleccionado: {selectedDate}</h2>
            <button onClick={() => {
              setSelectedDate(null);
              setGoalsSaved(false);
              setMeals([]);
              setGoals({ protein: '', carbs: '', fats: '', calories: '' });
            }}>⬅ Cambiar día</button>
          </div>

          <div className="comparison-container">
            <p><Drumstick size={18} className="inline-icon" color="#00CED1"/>
              Proteínas: <p className='protein-goals'>{totalMacros.protein.toFixed(1)}g</p>
               / {goals.protein}g <p className='protein-goals'>(
              {((totalMacros.protein / goals.protein) * 100).toFixed(0)}%) </p>
            </p>
            <p><Wheat size={18} className="inline-icon" color="#32CD32" />
              Carbohidratos: <p className='carbs-goals'> {totalMacros.carbs.toFixed(1)}g</p>
               / {goals.carbs}g <p className='carbs-goals'> (
              {((totalMacros.carbs / goals.carbs) * 100).toFixed(0)}%)</p>
              
            </p>
            <p><Droplet size={18} className="inline-icon" color="#FF8C00" />
              Grasas: <p className='fats-goals'>{totalMacros.fats.toFixed(1)}g</p>
               / {goals.fats}g <p className='fats-goals'> (
              {((totalMacros.fats / goals.fats) * 100).toFixed(0)}%)</p>
            </p>
            <p ><Flame size={18} className="inline-icon" color="#ff2f00" />
            
                Calorías Totales: <p className='calories-goals'>{totalCalories.toFixed(1)} kcal</p> 
                 / {goals.calories} kcal <p className='calories-goals'>(
                {((totalCalories / goals.calories) * 100).toFixed(0)}%)</p>
            
            </p>
            <button className="save-button edit-objects" onClick={() => setGoalsSaved(false)}> <span className="mobile-only">✏️</span>
  <span className="desktop-only">✏️ Editar objetivos</span></button>
          </div>

        
          <button className="add-meal-button" onClick={addMeal}>➕ Agregar comida</button>

          {meals.map((meal, index) => (
            <Meal key={index} meal={meal} index={index} addFood={addFoodToMeal} />
          ))}

          <button className="save-button" onClick={saveMeals}>💾 Guardar día</button>
        </>
      )}
    </div>
  );
};

const Meal = ({ meal, index, addFood }) => {
  const [foodInput, setFoodInput] = useState({
    name: '',
    grams: '',
    protein: '',
    carbs: '',
    fats: '',
    calories: ''
  });

  const handleAddFood = () => {
    addFood(index, {
      name: foodInput.name,
      grams: Number(foodInput.grams),
      protein: Number(foodInput.protein),
      carbs: Number(foodInput.carbs),
      fats: Number(foodInput.fats),
      calories: Number(foodInput.calories)
    });
    setFoodInput({ name: '', grams: '', protein: '', carbs: '', fats: '', calories: '' });
  };

  return (
    <div className="meal-card">
      <h3>{meal.name}</h3>
      <div className="food-form">
        <input type="text" placeholder="Nombre del alimento" value={foodInput.name} onChange={(e) => setFoodInput({ ...foodInput, name: e.target.value })} />
        <input type="number" placeholder="Gramos" value={foodInput.grams} onChange={(e) => setFoodInput({ ...foodInput, grams: e.target.value })} />
        <input type="number" placeholder="Proteínas (g)" value={foodInput.protein} onChange={(e) => setFoodInput({ ...foodInput, protein: e.target.value })} />
        <input type="number" placeholder="Carbohidratos (g)" value={foodInput.carbs} onChange={(e) => setFoodInput({ ...foodInput, carbs: e.target.value })} />
        <input type="number" placeholder="Grasas (g)" value={foodInput.fats} onChange={(e) => setFoodInput({ ...foodInput, fats: e.target.value })} />
        <input type="number" placeholder="Calorías (kcal)" value={foodInput.calories} onChange={(e) => setFoodInput({ ...foodInput, calories: e.target.value })} />
        <button onClick={handleAddFood}>➕ Agregar alimento</button>
      </div>

      {meal.foods.length > 0 ? (
        <ul className='meal-foods'>
          {meal.foods.map((food, idx) => (
            <li key={idx}>{food.name} - {food.grams}g, {food.protein}g proteína, {food.carbs}g carbohidrato, {food.fats}g grasa, {food.calories} kcal</li>
          ))}
        </ul>
      ) : (
        <p>No hay alimentos en esta comida.</p>
      )}
    </div>
  );
};