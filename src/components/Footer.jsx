import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <Link to="/about">About</Link>
        <div>Footer</div>
    </footer>
  )
}

export default Footer