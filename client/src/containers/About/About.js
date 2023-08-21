// About.js
import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import { images } from "../../constants";
import { endpoints } from '../../config/apiConfig';
import axios from 'axios';
import './About.scss'
import detailedReviews from './Reviews'
const About = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [facts, setFacts] = useState([])
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(endpoints.about.users);
        console.log("this is the about response ", response);
        setUsers(response.data);
      } catch (error) {
        // Handle error
        console.log(error)
      }
    }


    async function fetchFacts() {
      try {
        const response = await axios.get(endpoints.about.facts);
        console.log("this is the about the facts are here  ", response);
        setFacts(response.data);
      } catch (error) {
        // Handle error
        console.log(error)
      }
    }


    fetchReviews();
    fetchFacts();
  }, [])


  return (
    <div>
      <section class="about">

        <div class="row">

          <div class="image">
            <img src={images.about} alt="" />
          </div>

          <div class="content">
            <h3>why choose us?</h3>
            <p>
              Unleash your learning potential with EduPrime Hub. Our carefully curated courses offer expert-led education tailored to your needs. With flexible schedules, top-tier instructors, and a supportive community, you'll master new skills at your pace. Elevate your future with recognized certifications and a network of like-minded learners. Join  now and transform your journey of self-improvement into a story of success.</p>

            <Link to={"/courses"}>
              <a class="inline-btn">our courses</a>
            </Link>
          </div>

        </div>

        <div class="box-container">

          <div class="box">
            <i class="fas fa-graduation-cap"></i>
            <div>
              <h3>{facts.numberOfCourses}</h3>
              <p>online courses</p>
            </div>
          </div>

          <div class="box">
            <i class="fas fa-user-graduate"></i>
            <div>
              <h3>{facts.numberOfStudents}</h3>
              <p>brilliant students</p>
            </div>
          </div>

          <div class="box">
            <i class="fas fa-chalkboard-user"></i>
            <div>
              <h3>{facts.numberOfTeachers}</h3>
              <p>expert tutors</p>
            </div>
          </div>

          <div class="box">
            <i class="fas fa-briefcase"></i>
            <div>
              <h3>100%</h3>
              <p>job placement</p>
            </div>
          </div>

        </div>

      </section>


      <section class="reviews">

        <h1 class="heading">student's reviews</h1>

        <div class="box-container">

          {
            users.map((item, index) => (

              <div class="box" key={index}>
                <div class="student">
                  <img className='image'
                    src={`data:image/jpeg;base64,${item.userImage}`} />
                  <div>
                    <h3>{item.userName}</h3>
                  </div>
                </div>
                <div className='review'> <p>
                  {detailedReviews[index]}
                </p>
                </div>
              </div>
            ))
          }





        </div>

      </section>

    </div>
  );
};

export default About;
