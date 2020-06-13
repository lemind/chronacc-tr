import React from 'react'
import { Link } from "react-router-dom"

export default function Menu() {
  return (
    <div>
      <span><Link to="/">Home</Link></span>
      <span> | </span>
      <span><Link to="/projects">Projects</Link></span>
    </div>
  )
}
