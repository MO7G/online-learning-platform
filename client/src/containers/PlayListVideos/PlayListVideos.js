import React, { useEffect, useState } from 'react'
import './PlayListVideos.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { useParams } from 'react-router-dom';
const PlayListVideos = () => {
    const { courseId } = useParams();
    const [courseVideos, setCourseVideos] = useState([]);
    useEffect(() => {
        async function fetchCourses() {

            try {
                const response = await axios.get(endpoints.videos.videosByCourse.replace(':courseId', courseId));
                console.log("this is the playlistcoursevideo response ", response);
                setCourseVideos(response.data);
            } catch (error) {
                // Handle error
            }
        }
        fetchCourses();
    }, []);





    return (

        <section class="playlist-videos">

            <h1 class="heading">playlist videos</h1>
            <div class="box-container">
                {courseVideos.map(item => (
                    <Link key={item._id} to={`/video/${item._id}`} className="box">
                        <i className="fas fa-play"></i>
                        <img src={`data:image/jpeg;base64, ${item.img}`} alt="" />
                        <h3>{item.name}</h3>
                    </Link>
                ))}
            </div>

        </section>
    )
}

export default PlayListVideos