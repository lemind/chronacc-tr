import React from 'react'
import { Link } from "react-router-dom"

import './menu.less'

export default function Menu() {
  return (
    <div className="menu">
      <Link className="menuItem" to="/">Home</Link>
      <Link className="menuItem" to="/projects">Projects</Link>
    </div>
  )
}
