import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      
        <Navbar/>
        <div className="home-container">
        <Link to="/create" className="nav-link link"> <button className='home-btn'>Create Quiz</button></Link>
        <Link to="/play" className="nav-link link"><button className='home-btn'>Play Quiz</button></Link>
          
        </div>
    </div>
  )
}

export default Home