import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../styles/nutritionStats.css";
import { FileX } from "lucide-react";

import { useState } from "react";
import { ArrowLeft, Flame, UtensilsCrossed, Sandwich, Wheat, Droplet, Drumstick } from "lucide-react";

export const NutritionStats = ({ nutritionData, nutritionGoals, setSelectedSection, loading }) => {
  const [expandedMeals, setExpandedMeals] = useState({});

  if (loading) {
    return <p>Cargando datos de nutrición...</p>;
  }

  if (!nutritionData || Object.keys(nutritionData).length === 0) {
    return (
      <div>
        <button onClick={() => setSelectedSection(null)} className="back-btn">
          <ArrowLeft size={20} color="#8884d8" />
        </button>
        <p className="text-no-date">
          No hay datos de nutrición disponibles para mostrar.</p>
          <FileX className="w-8 h-8 text-muted-foreground" color="red" size={40} />
      </div>
    );
  }

  const toggleMeal = (index) => {
    setExpandedMeals((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const calculateNutritionTotals = (meals) => {
    let totals = { proteinas: 0, grasas: 0, carbohidratos: 0 };
    Object.values(meals || {}).forEach(meal => {
      if (Array.isArray(meal.foods)) {
        meal.foods.forEach(alimento => {
          totals.proteinas += parseFloat(alimento.protein) || 0;
          totals.grasas += parseFloat(alimento.fats) || 0;
          totals.carbohidratos += parseFloat(alimento.carbs) || 0;
        });
      }
    });
    return totals;
  };

  const calculateMealTotals = (foods = []) => {
    let totals = { proteinas: 0, grasas: 0, carbohidratos: 0 };
    foods.forEach(food => {
      totals.proteinas += parseFloat(food.protein) || 0;
      totals.grasas += parseFloat(food.fats) || 0;
      totals.carbohidratos += parseFloat(food.carbs) || 0;
    });
    return totals;
  };

  const totals = calculateNutritionTotals(nutritionData);

  const totalCalories = (
    (totals.proteinas * 4) +
    (totals.carbohidratos * 4) +
    (totals.grasas * 9)
  ).toFixed(0);

  const maxMacro = Math.max(totals.proteinas, totals.carbohidratos, totals.grasas);

  const formatNumber = (num) => (num !== undefined && num !== null ? num : "-");

  const barData = [
    { name: "Proteínas", valor: totals.proteinas },
    { name: "Grasas", valor: totals.grasas },
    { name: "Carbohidratos", valor: totals.carbohidratos },
  ];

  return (
    <>
      <span>
        <button onClick={() => setSelectedSection(null)} className="back-btn">
          <ArrowLeft size={20} color="#11BF7F" />
        </button>
      </span>

      <section className="container-goals">
        <h4>Objetivos diarios</h4>
        {nutritionGoals ? (
          <ul className="goal-card">
            <li className="calories-goals"><Flame size={18} className="inline-block text-orange-500 mr-2" /> Calorías: {formatNumber(nutritionGoals.calories)}</li>
            <li className="protein-goals"><Drumstick size={18} className="inline-block text-cyan-400 mr-2" /> Proteínas: {formatNumber(nutritionGoals.protein)}g</li>
            <li className="fats-goals"><Droplet size={18} className="inline-block text-yellow-100 mr-2" /> Grasas: {formatNumber(nutritionGoals.fats)}g</li>
            <li className="carbs-goals"><Wheat size={18} className="inline-block text-yellow-300 mr-2" /> Carbohidratos: {formatNumber(nutritionGoals.carbs)}g</li>
          </ul>
        ) : (
          <p>No hay objetivos definidos para este día.</p>
        )}
      </section>

      <div className="container-nutrition-stats">
        <section className="container-graphs-nutrition">
          <h4>objetivos alcanzados</h4>
          <section className="daily-summary-text">
            <p className="total-calories">
              <Flame size={18} color="#ff2f00" style={{ marginRight: "6px" }} />
              Calorías totales: <strong className="total-cal">{totalCalories} kcal</strong>
            </p>

            <p>
              <UtensilsCrossed size={18} color="#11BF7F" style={{ marginRight: "6px" }} />
              Total de comidas: <strong className="food">{Object.keys(nutritionData).length}</strong>
            </p>

            <p>
              <Sandwich size={18} color="#32CD32" style={{ marginRight: "6px" }} />
              Total de alimentos: <strong className="total-foods">{
                Object.values(nutritionData).reduce((acc, meal) => acc + (meal.foods ? meal.foods.length : 0), 0)
              }</strong>
            </p>
          </section>

          <div className="container-macro-bars">
            <div className="macro-bar">
              <span>Proteínas: {totals.proteinas.toFixed(1)}g</span>
              <div className="bar-container">
                <div className="bar-fill protein" style={{ width: `${(totals.proteinas / maxMacro) * 100}%` }} />
              </div>
            </div>
            <div className="macro-bar">
              <span>Grasas: {totals.grasas.toFixed(1)}g</span>
              <div className="bar-container">
                <div className="bar-fill fats" style={{ width: `${(totals.grasas / maxMacro) * 100}%` }} />
              </div>
            </div>
            <div className="macro-bar">
              <span>Carbohidratos: {totals.carbohidratos.toFixed(1)}g</span>
              <div className="bar-container">
                <div className="bar-fill carbs" style={{ width: `${(totals.carbohidratos / maxMacro) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="container-pie-chart">
            <ResponsiveContainer width="80%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#11BF7F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="container-resumen">
          <div className="meal-summary">
            <h4 className="title-meal-section">Resumen por comida</h4>
            <div className="meal-cards-container">
              {Object.entries(nutritionData).map(([_, meal], index) => {
                const mealTotals = calculateMealTotals(meal.foods);
                const mealName = `Comida ${index + 1}`;
                const isExpanded = expandedMeals[index];

                return (
                  <div key={index} className="meal-card-nutrition">
                    <div className="meal-header" onClick={() => toggleMeal(index)}>
                      <h5>{mealName}</h5>
                      <span>{isExpanded ? "▲" : "▼"}</span>
                    </div>

                    {isExpanded && (
                      <div className="meal-body">
                        <ul className="meal-foods">
                          {meal.foods.map((food, i) => (
                            <li key={i}>
                              {food.name} - {food.grams}g (P: {food.protein}g, G: {food.fats}g, C: {food.carbs}g)
                            </li>
                          ))}
                        </ul>
                        <div className="meal-totals">
                          Total: 
                          <span className="proteinas"> Proteínas: {mealTotals.proteinas.toFixed(1)}g</span>, 
                          <span className="grasas"> Grasas: {mealTotals.grasas.toFixed(1)}g</span>, 
                          <span className="carbos"> Carbohidratos: {mealTotals.carbohidratos.toFixed(1)}g</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};