import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './TeacherProfile.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import Courses from '../Courses/Courses';
const TeacherProfile = () => {
    const [teacherProfile, setTeacherProfile] = useState([]);
    const [coureses, setCourses] = useState([]);
    const [totalNumberOfVidoes, setTotalNumberOfVidoes] = useState([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const teacherId = queryParams.get('teacherId');


    useEffect(() => {
        async function fetchTeacherProfile() {
            try {
                const response = await axios.get(endpoints.user.teacherProfile.replace(':teacherId', teacherId));
                console.log("this is the teacher profile response ", response);
                setTeacherProfile(response.data[0]);
            } catch (error) {
                // Handle error
                console.log("no courses failed")
            }
        }

        async function fetchTeacherAllVideos() {
            try {
                const response = await axios.get(endpoints.user.TeacherVideosTotal.replace(':teacherId', teacherId));
                setTotalNumberOfVidoes(response.data[0].total_videos)
                // setTeacherProfile(response.data[0]);
            } catch (error) {
                // Handle error
                console.log("no courses failed")
            }
        }



        async function fetchTeacherCourses() {
            try {
                const response = await axios.get(endpoints.user.teacherCourses.replace(':teacherId', teacherId));
                console.log("this is the total coures !!!!  ", response.data[0]);
                setCourses(response.data);
            } catch (error) {
                console.log("no courses failed")
            }
        }

        fetchTeacherProfile();
        fetchTeacherCourses();
        fetchTeacherAllVideos();
    }, []);





    return (
        <div>
            <section class="teacher-profile" >

                <h1 class="heading">profile details</h1>

                <div class="details">
                    <div class="tutor">
                        <img className='image' src={`data:image/jpeg;base64,${teacherProfile.image}`} alt={teacherProfile.user_name} />
                        <h3>{teacherProfile.user_name}</h3>
                        <span>developer</span>
                    </div>
                    <div class="flex">
                        <p>total courses : <span>{teacherProfile.num_courses}</span></p>
                        <p>total videos : <span>{totalNumberOfVidoes}</span></p>
                        <p>total likes : <span>{teacherProfile.total_likes}</span></p>
                        <p>total comments : <span>{teacherProfile.total_comments}</span></p>
                    </div>
                </div>

            </section >

            <section class="courses">

                <h1 class="heading">our courses</h1>

                <div class="box-container">

                    {coureses.map((item) => (
                        <div class="box" key={item.courseName}>
                            <div class="thumb">
                                <img src={`data:image/jpeg;base64,${item.courseImage}`} alt="" />
                                <span>{item.numberofVideos} videos</span>
                            </div>
                            <h3 class="title">{item.courseName}</h3>
                            <Link to={`/courses/${item.courseId}`} class="inline-btn">view playlist</Link>
                        </div>
                    ))}
                </div>

            </section>
        </div>


    )
}

export default TeacherProfile