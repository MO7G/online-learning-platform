import React, { useEffect, useState } from 'react'
import './Playlist.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { useParams } from 'react-router-dom';
import PlayListVideos from '../PlayListVideos/PlayListVideos';
const Playlist = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState([]);
    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get(endpoints.courses.getCourseById.replace(':courseId', courseId));
                console.log("this is the  response from the playlist  ", response)
                setCourse(response.data);

            } catch (error) {
                // Handle error
            }
        }
        fetchCourses();
    }, []);


    return (
        <div>
            <section class="playlist-details">
                <h1 class="heading">playlist details</h1>
                <div class="row">
                    <div class="column">
                        <form action="" method="post" class="save-playlist">
                            <button type="submit"><i class="far fa-bookmark"></i> <span>save playlist</span></button>
                        </form>

                        <div class="thumb">
                            <img src={`data:image/jpeg;base64, ${course.courseImage}`} alt="" />
                            <span>{course.numOfVideos}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="tutor">
                            <img src={`data:image/jpeg;base64, ${course.teacherImage}`} alt="" />                            <div>
                                <h3>{course.teacherName}</h3>
                                <span>{course.date}</span>
                            </div>
                        </div>

                        <div class="details">
                            <h3>{course.courseName}</h3>
                            <p>{course.description}</p>
                            <Link to={`/TeacherProfile?teacherId=${course.teacherId}`}>
                                <a class="inline-btn">view profile</a>
                            </Link>
                        </div>
                    </div>
                </div>

            </section>
            <PlayListVideos></PlayListVideos>
        </div>
    )
}

export default Playlist

