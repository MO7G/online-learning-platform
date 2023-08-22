import React, { useEffect, useState } from 'react'
import './EnrolledCourses.scss'
import { images } from '../../constants'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);
    const [allowedCourses, setAllowedCourses] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));
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
        fetchCourses();
        fetchEnrolled();
    }, []);

    const temp = () => {
        console.log(allowedCourses)
    }


    return (
        <div className='Courses-container'>
            <section class="courses">
                <h1 class="heading">your Enrolled courses</h1>

                <div className="box-container">
                    {courses.map(item => {
                        const matchingEnrol = allowedCourses.find(enrol => enrol.courseId === item._id);

                        if (matchingEnrol) {
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
                                    <Link to={`/courses/${item._id}`} className="inline-btn">
                                        View Playlist
                                    </Link>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>


            </section >

        </div >
    )
}

export default EnrolledCourses