import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { Link } from 'react-router-dom';
import StudentWrapper from '../../components/wrapper/StudentWrapper';

import './Teachers.scss'

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await axios.get(endpoints.user.allTeachers);
                console.log("this is the res of all teachers   ", response)
                setTeachers(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTeachers();
    }, []);


    return (
        <div>
            <section class="teachers">
                <h1 class="heading">expert teachers</h1>

                <form action="" method="post" class="search-tutor">
                    <input type="text" name="search_box" placeholder="search tutors..." required maxlength="100" />
                    <button type="submit" class="fas fa-search" name="search_tutor"></button>
                </form>


                <div class="box-container">

                    <StudentWrapper>
                        <div class="box offer">
                            <h3>become a tutor</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque ipsam fuga ex et aliquam.</p>
                            <Link to={"/teacherRegister"}>
                                <a href="register.html" class="inline-btn">get started</a>
                            </Link>

                        </div>
                    </StudentWrapper>


                    {teachers.map((teacher) => (
                        <div class="box">
                            <div class="tutor">
                                <img className='image'
                                    src={`data:image/jpeg;base64,${teacher.user_image}`} />
                                <div>
                                    <h3>{teacher.user_name}</h3>
                                    <span>{teacher.role}</span>
                                </div>
                            </div>
                            <p>total playlists : <span>{teacher.num_courses}</span></p>
                            <p>total videos : <span>{teacher.num_videos}</span></p>
                            <p>total likes : <span>{teacher.total_likes}</span></p>
                            <Link to={`/TeacherProfile?teacherId=${teacher.user_id}`}>
                                <a class="inline-btn">view profile</a>
                            </Link>

                        </div>
                    ))}



                </div>

            </section>
        </div>
    )
}

export default Teachers