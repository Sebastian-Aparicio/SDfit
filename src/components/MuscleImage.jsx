import { useState } from "react";
import "../styles/muscles.css"
import biceps from "../assets/biceps.png"

import React from 'react'

export const MuscleImage = () => {
  return (
    <div className="muscle-container">
        <img src={biceps} alt="" />
    </div>
  )
}
