import React, { useEffect, useState } from 'react'
import './Home.scss'
import { Link } from "react-router-dom";

import Courses from '../Courses/Courses'
import { images } from '../../constants'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserWrapper from '../../components/wrapper/UserWrapper'
import { reset, generalInfo } from "../../features/auth/authSlice";

const Home = () => {
  const isLogged = useSelector(state => state.auth.user);
  const { general } = useSelector(
    (state) => state.auth
  );
  const { name, setName } = useState('');
  const { counter, setCounter } = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  return (
    <div>
      <section class="home-grid">

        <h1 class="heading">quick options</h1>
        <div class="box-container">
          <div class="box">
            <h3 class="title">top categories</h3>
            <div class="flex">
              <a href="#"><i class="fas fa-code"></i><span>development</span></a>
              <a href="#"><i class="fas fa-chart-simple"></i><span>business</span></a>
              <a href="#"><i class="fas fa-pen"></i><span>design</span></a>
              <a href="#"><i class="fas fa-chart-line"></i><span>marketing</span></a>
              <a href="#"><i class="fas fa-music"></i><span>music</span></a>
              <a href="#"><i class="fas fa-camera"></i><span>photography</span></a>
              <a href="#"><i class="fas fa-cog"></i><span>software</span></a>
              <a href="#"><i class="fas fa-vial"></i><span>science</span></a>
            </div>
          </div>

          <div class="box">
            <h3 class="title">popular topics</h3>
            <div class="flex">
              <a href="#"><i class="fab fa-html5"></i><span>HTML</span></a>
              <a href="#"><i class="fab fa-css3"></i><span>CSS</span></a>
              <a href="#"><i class="fab fa-js"></i><span>javascript</span></a>
              <a href="#"><i class="fab fa-react"></i><span>react</span></a>
              <a href="#"><i class="fab fa-php"></i><span>PHP</span></a>
              <a href="#"><i class="fab fa-bootstrap"></i><span>bootstrap</span></a>
            </div>
          </div>
          <div class="box">
            <h3 class="title">Check Our Reviews</h3>
            <p class="tutor">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, nam?</p>
            <Link to={"/about"}>
              <a class="inline-btn">get started</a>
            </Link>
          </div>
        </div>
      </section>

      <div className='courses-container'>
        <Courses></Courses>
      </div>
    </div>
  )
}

export default Home