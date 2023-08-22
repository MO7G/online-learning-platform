import React, { useEffect, useState } from 'react'
import './Courses.scss'
import { images } from '../../constants'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
const Courses = () => {
   const [courses, setCourses] = useState([]);
   const [allowedCourses, setAllowedCourses] = useState([])
   const user = JSON.parse(localStorage.getItem('user'));
   const navigate = useNavigate();
   useEffect(() => {
      async function fetchCourses() {
         try {
            const response = await axios.get(endpoints.courses.allCourses);
            console.log("this is the course response ", response);
            setCourses(response.data);
         } catch (error) {
            // Handle error
            console.log(error)
         }
      }


      async function fetchEnrolled() {

         try {
            const response = await axios.get(endpoints.enrol.getEnrol.replace(":userId", user._id));
            console.log("this is the get eneroll ", response);
            setAllowedCourses(response.data);
         } catch (error) {
            // Handle error
            console.log(error)
         }
      }


      fetchEnrolled();

      fetchCourses();
   }, []);

   const handleEnrol = async (courseid) => {

      try {


         const requestData = {
            courseId: courseid,
            userId: user._id,
         };

         const response = await axios.post(endpoints.enrol.insertEnrol.replace(":userId", user._id), requestData);
         console.log("Response: ", response);
         navigate("/enrolledCourses")
         toast("congrat the courses is your now !!")
      } catch (error) {
         console.log(error);
      }
   };



   return (
      <div className='Courses-container'>
         <section class="courses">

            <h1 class="heading">our courses</h1>

            <div className="box-container">
               {courses.map(item => {
                  const matchingEnrol = allowedCourses.find(enrol => enrol.courseId === item._id);

                  return (
                     <div key={item._id} className="box">
                        <div className="tutor">
                           <div className="tutor_wrapper">
                              <img src={`data:image/jpeg;base64, ${item.userImage}`} alt="" />
                           </div>
                           <div className="info">
                              <h3>{item.user_name}</h3>
                              <span>{item.date}</span>
                           </div>
                        </div>
                        <div className="thumb">
                           <img src={`data:image/png;base64, ${item.courseImage}`} alt="" />
                           <span>{item.numOfVideos} videos</span>
                        </div>
                        <h3 className="title">{item.name}</h3>
                        {matchingEnrol && matchingEnrol.StudentID !== user._id ? (
                           <Link to={`/courses/${item._id}`} className="inline-btn">
                              view playlist
                           </Link>
                        ) : (
                           <button id='enrollbtn' onClick={() => handleEnrol(item._id)} disabled={matchingEnrol && matchingEnrol.StudentID === user._id} className="inline-btn">
                              Enroll
                           </button>
                        )}
                     </div>
                  );
               })}
            </div>

         </section>

      </div>
   )
}



export default Courses