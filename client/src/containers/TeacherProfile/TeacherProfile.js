import React, { useEffect, useState } from 'react'
import './TeacherProfile.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
const TeacherProfile = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get(endpoints.courses.allCourses);
                console.log("this is the course response ", response);
                setCourses(response.data);
            } catch (error) {
                // Handle error
                console.log("no courses failed")
            }
        }
        fetchCourses();
    }, []);





    return (
        <div>
            <section class="teacher-profile" >

                <h1 class="heading">profile details</h1>

                <div class="details">
                    <div class="tutor">
                        <img src="images/pic-2.jpg" alt="" />
                        <h3>john deo</h3>
                        <span>developer</span>
                    </div>
                    <div class="flex">
                        <p>total playlists : <span>4</span></p>
                        <p>total videos : <span>18</span></p>
                        <p>total likes : <span>1208</span></p>
                        <p>total comments : <span>52</span></p>
                    </div>
                </div>

            </section >

            <section class="courses">

                <h1 class="heading">our courses</h1>

                <div class="box-container">

                    <div class="box">
                        <div class="thumb">
                            <img src="images/thumb-1.png" alt="" />
                            <span>10 videos</span>
                        </div>
                        <h3 class="title">complete HTML tutorial</h3>
                        <a href="playlist.html" class="inline-btn">view playlist</a>
                    </div>




                </div>

            </section>
        </div>


    )
}

export default TeacherProfile