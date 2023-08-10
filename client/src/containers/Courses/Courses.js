import React from 'react'
import './Courses.scss'
import { images } from '../../constants'
import { Link } from 'react-router-dom';


const Courses = () => {
   const data = require('../../testing/courses.json');
   console.log(data);

   return (
      <div className='Courses-container'>
         <section class="courses">

            <h1 class="heading">our courses</h1>

            <div class="box-container">

               {data.map(item => (
                  <div key={item.id} className="box">
                     <div className="tutor">
                        <img src={images[item.thumbnail]} alt="" />
                        <div className="info">
                           <h3>{item.name}</h3>
                           <span>{item.date}</span>
                        </div>
                     </div>
                     <div className="thumb">
                        <img src={images[item.thumbnail]} alt="" />
                        <span>{item.videoCount} videos</span>
                     </div>
                     <h3 className="title">{item.title}</h3>
                     <Link to={`/courses/${item.id}`} className="inline-btn">
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