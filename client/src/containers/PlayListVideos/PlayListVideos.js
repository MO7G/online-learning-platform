import React, { useEffect, useState } from 'react'
import './PlayListVideos.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { useParams } from 'react-router-dom';
const PlayListVideos = () => {
    const { courseId } = useParams();
    const [courseVideos, setCourseVideos] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const fetchUserCount = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/user'); // Replace with your API endpoint
            setUserCount(response.data.studentCount);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };
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


    useEffect(() => {
        // fetchUserCount();
        // const interval = setInterval(fetchUserCount, 5000); // Poll every 5 seconds
        //return () => clearInterval(interval);
    }, []);








    return (

        <section class="playlist-videos">

            <h1 class="heading">playlist videos {userCount}</h1>
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