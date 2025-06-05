import { FaDumbbell, FaHeartbeat, FaAppleAlt } from "react-icons/fa";

export const FitnessTips = () => {
  return (
    <section className="fitness-tips">
    <div className="container-fitness-tips">
      
         
    <div className="cards">
    <div className="card red">
    <FaDumbbell className="icon-tips" />
        
        <p className="second-text">Realiza ejercicios
        compuestos para maximizar tu fuerza.</p>
    </div>
   
    <div className="card blue">
    <FaHeartbeat className="icon-tips" />
        
        <p className="second-text">No olvides incluir cardio en tu rutina para mejorar tu resistencia.</p>
    </div>
    <div className="card green">
    <FaAppleAlt className="icon-tips" />
        
        <p className="second-text">Mantén una alimentación balanceada para obtener mejores resultados.</p>
    </div>
</div>


      
      
      
      
    </div>
  </section>
  )
}
