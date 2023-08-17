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
                            <img src={`data:image/jpeg;base64, ${course.img}`} alt="" />
                            <span>{course.numOfVideos}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="tutor">
                            <img src={`data:image/jpeg;base64, ${course.img}`} alt="" />                            <div>
                                <h3>Mo7a</h3>
                                <span>{course.date}</span>
                            </div>
                        </div>

                        <div class="details">
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                            <a href="teacher_profile.html" class="inline-btn">view profile</a>
                        </div>
                    </div>
                </div>

            </section>
            <PlayListVideos></PlayListVideos>
        </div>
    )
}

export default Playlist

