import React, { useEffect, useState } from 'react'
import './Courses.scss'
import { images } from '../../constants'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';

const Courses = () => {
   const [courses, setCourses] = useState([]);
   useEffect(() => {
      async function fetchCourses() {
         try {
            const response = await axios.get(endpoints.courses.allCourses);
            console.log("this is the course response ", response);
            setCourses(response.data);
         } catch (error) {
            // Handle error
         }
      }
      fetchCourses();
   }, []);

   return (
      <div className='Courses-container'>
         <section class="courses">

            <h1 class="heading">our courses</h1>

            <div class="box-container">

               {courses.map(item => (
                  <div key={item._id} className="box">
                     <div className="tutor">
                        <div className='tutor_wrapper'>
                           <img src={`data:image/jpeg;base64, ${item.img}`} alt="" />
                        </div>
                        <div className="info">
                           <h3>moha</h3>
                           <span>{item.date}</span>
                        </div>
                     </div>
                     <div className="thumb">
                        <img src={`data:image/png;base64, ${item.img}`} alt="" />
                        <span>{item.numOfVideos} videos</span>
                     </div>
                     <h3 className="title">{item.name}</h3>
                     <Link to={`/courses/${item._id}`} className="inline-btn">
                        View Playlist
                     </Link>
                  </div>
               ))}

            </div>

         </section>

      </div>
   )
}

export default Courses