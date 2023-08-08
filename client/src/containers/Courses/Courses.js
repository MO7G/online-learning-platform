import React from 'react'
import './Courses.scss'
import { images } from '../../constants'

const Courses = () => {
  return (
    <div className='Courses-container'>
      <section class="courses">

<h1 class="heading">our courses</h1>

<div class="box-container">

   <div class="box">
      <div class="tutor">
         <img src={images.pic1} alt="" />
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src={images.thumb1} alt="" />
         <span>10 videos</span>
      </div>
      <h3 class="title">complete HTML tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

   <div class="box">
      <div class="tutor">
         <img src={images.pic2} alt="" />
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src={images.thumb2} alt="" />
         <span>10 videos</span>
      </div>
      <h3 class="title">complete CSS tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

   <div class="box">
      <div class="tutor">
         <img src="images/pic-4.jpg" alt="" />
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src="images/thumb-3.png" alt="" />
         <span>10 videos</span>
      </div>
      <h3 class="title">complete JS tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

   <div class="box">
      <div class="tutor">
         <img src="images/pic-5.jpg" alt="" /> 
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src="images/thumb-4.png" alt="" />
         <span>10 videos</span>
      </div>
      <h3 class="title">complete Boostrap tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

   <div class="box">
      <div class="tutor">
         <img src="images/pic-6.jpg" alt="" />
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src="images/thumb-5.png" alt="" />
         <span>10 videos</span>
      </div>
      <h3 class="title">complete JQuery tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

   <div class="box">
      <div class="tutor">
         <img src="images/pic-7.jpg" alt="" />
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src="images/thumb-6.png" alt="" />
         <span>10 videos</span>
      </div>
      <h3 class="title">complete SASS tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

   <div class="box">
      <div class="tutor">
         <img src="images/pic-8.jpg" alt=""/>
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src="images/thumb-7.png" alt=""/>
         <span>10 videos</span>
      </div>
      <h3 class="title">complete PHP tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

   <div class="box">
      <div class="tutor">
         <img src="images/pic-9.jpg" alt="" / >
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src="images/thumb-8.png" alt=""/>
         <span>10 videos</span>
      </div>
      <h3 class="title">complete MySQL tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

   <div class="box">
      <div class="tutor">
         <img src="images/pic-1.jpg" alt=""/>
         <div class="info">
            <h3>john deo</h3>
            <span>21-10-2022</span>
         </div>
      </div>
      <div class="thumb">
         <img src="images/thumb-9.png" alt=""/>
         <span>10 videos</span>
      </div>
      <h3 class="title">complete react tutorial</h3>
      <a href="playlist.html" class="inline-btn">view playlist</a>
   </div>

</div>

</section>

    </div>
  )
}

export default Courses