import exercises  from "../data/dataExercise"

export const Exercise = () => {

  

  return (
    <div>
       {exercises.map(exercise => (<li key={exercise.id}>
        {exercise.name}
       </li>))}

    </div>

  )
}
