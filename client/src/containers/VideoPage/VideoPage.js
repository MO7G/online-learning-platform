import React, { useEffect, useState } from 'react'
import './VideoPage.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { useParams } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai'
const VideoPage = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(0);
    const [comments, setComments] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        async function fetchCourses() {

            try {
                const response = await axios.get(endpoints.videos.videoDetails.replace(':id', videoId));
                setVideo(response.data);
            } catch (error) {
                // Handle error
            }
        }
        async function fetchComments() {

            try {
                const response = await axios.get(endpoints.videos.videoCommentDetails.replace(':id', videoId));
                setCommentsNumber(response.data.numberOfComments[0].rowCount);
                setComments(response.data.comments);
            } catch (error) {
                // Handle error
            }
        }
        fetchCourses();
        fetchComments();
    }, []);


    const handleDeleteComment = async (index, InteractionId) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
        try {
            const response = await axios.delete(endpoints.videos.deleteVideoComment.replace(':interactionId', InteractionId));
            setVideo("hahahah ", response.data);
        } catch (error) {
            // Handle error
        }
    }








    return (
        <div>
            <button>asdfasfas</button>
            <section class="watch-video">

                <div class="video-container">
                    <div class="video">
                        <iframe
                            src={video.videoLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <h3 class="title">{video.videoName}</h3>
                    <div class="info">
                        <p class="date"><i class="fas fa-calendar"></i><span>{video.date}</span></p>
                        <p class="date"><i class="fas fa-heart"></i><span>{video.likes_counter} likes</span></p>
                    </div>
                    <div class="tutor">
                        <img src="images/pic-2.jpg" alt="" />
                        <div>
                            <h3>mo7a</h3>
                            <span>developer</span>
                        </div>
                    </div>
                    <form action="" method="post" class="flex">
                        <Link key={video.videoId} to={`/courses/${video.courseId}`} className="box">
                            <a class="inline-btn">view playlist</a>
                        </Link>


                        <button><i class="far fa-heart"></i><span>like</span></button>
                    </form>
                    <p class="description">{video.description}</p>
                </div>

            </section>

            <section class="comments">

                <h1 class="heading">{commentsNumber} comments</h1>

                <form action="" class="add-comment">
                    <h3>add comments</h3>
                    <textarea name="comment_box" placeholder="enter your comment" required maxlength="1000" cols="30" rows="10"></textarea>
                    <input type="submit" value="add comment" class="inline-btn" name="add_comment" />
                </form>

                <h1 class="heading">user comments</h1>

                <div class="box-container">
                    {comments.map((item, index) => (
                        <div class="box" key={index}>
                            <div class="user">
                                <img src="images/pic-1.jpg" alt="" />
                                <div>
                                    <h3>{item.user_name}</h3>
                                    <span>{item.date}</span>
                                </div>
                            </div>

                            <div className="comment-box">

                                <div className='comment'>{item.comment}</div>
                                {user && user._id === item.user_id && (
                                    <div className='delete_btn'>
                                        {<a>
                                            <AiOutlineDelete onClick={() => handleDeleteComment(index, item.InteractionID)} className='dumpster'></AiOutlineDelete>
                                        </a>}
                                    </div>)}


                            </div>

                            <div class="flex-btn">

                            </div>
                        </div>
                    ))}




                </div>

            </section >

        </div >
    )
}

export default VideoPage