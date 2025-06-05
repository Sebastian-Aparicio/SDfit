import "../styles/option-muscles.css"
import silueta from "../assets/musclet-img.png"



export const BodyIcon1 = () => {
   return(
    <section className="body-icon">
    
    <div className="container-body-icon" >

    <img 
    className='img'
    src={silueta}// Reemplaza con la ruta correcta de tu imagen
    alt="Muscle Silhouette"
    style={{ filter: "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))" }}
  />


    </div>
    
    </section>
   )

  
}
