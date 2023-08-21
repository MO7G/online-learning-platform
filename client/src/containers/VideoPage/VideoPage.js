import React, { useEffect, useState } from 'react'
import './VideoPage.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { useParams } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import { AiOutlineLike } from 'react-icons/ai'


const VideoPage = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(0);
    const [comments, setComments] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [postComment, setPostComment] = useState('')
    const [error, setError] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get('courseId');

    useEffect(() => {
        async function fetchCourses() {

            try {
                const response = await axios.get(endpoints.videos.videoDetails.replace(':id', videoId));
                console.log("this is the response info ", response);
                setVideo(response.data);
            } catch (error) {
                // Handle error
                console.log("this is the response info ", error);

            }
        }
        async function fetchComments() {

            try {
                const response = await axios.get(endpoints.videos.videoCommentDetails.replace(':id', videoId));
                console.log("from the comment response ", response)
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


    const handleCommentChange = (e) => {
        setPostComment(e.target.value);
        setError(false); // Clear any previous errors when input changes
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (postComment.trim() === "") {
            setError("Comment cannot be empty");
        } else {
            try {
                const requestData = {
                    courseId: courseId, // Replace with the actual course ID
                    userId: user._id,
                    comment: postComment,
                    videoId: videoId
                    // Replace with the actual user ID
                };
                const response = await axios.post(endpoints.videos.addVideoComment.replace(':userId', user._id), requestData);
                console.log("the response is me ", response);
                // Clear the comment field and reset error state
                const currentDate = new Date(); // Get the current date/time
                const datatoday = currentDate.toISOString();
                const tempComment = {
                    InteractionDate: datatoday,
                    user_id: user._id,
                    comment: postComment,
                    image: user.img,
                    user_name: user.name,
                    InteractionID: response.data.interactionId

                }
                // updateTheAddedComments(tempComment);
                setComments((prevComments) => [...prevComments, tempComment]);

                setPostComment("");
                setError(false);
            } catch (error) {
                // Handle error
                console.log(error)
            }
        }
    }




    const handleLike = async (e) => {
        e.preventDefault();

        if (postComment.trim() === "") {
            setError("Comment cannot be empty");
        } else {
            try {
                const requestData = {
                    courseId: courseId, // Replace with the actual course ID
                    userId: user._id,
                    comment: postComment,
                    videoId: videoId
                    // Replace with the actual user ID
                };
                const response = await axios.post(endpoints.videos.addVideoComment.replace(':userId', user._id), requestData);
                console.log("the response is me ", response);
                // Clear the comment field and reset error state
                const currentDate = new Date(); // Get the current date/time
                const datatoday = currentDate.toISOString();
                const tempComment = {
                    InteractionDate: datatoday,
                    user_id: user._id,
                    comment: postComment,
                    image: user.img,
                    user_name: user.name,
                    InteractionID: response.data.interactionId

                }
                // updateTheAddedComments(tempComment);
                setComments((prevComments) => [...prevComments, tempComment]);

                setPostComment("");
                setError(false);
            } catch (error) {
                // Handle error
                console.log(error)
            }
        }
    }








    const temp = () => {
        console.log("i am the course id ", courseId)
    }


    return (
        <div>

            <section class="watch-video">

                <div class="video-container">
                    <div class="video" dangerouslySetInnerHTML={{ __html: video.videoLink }} />
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
                        <Link key={video.videoId} to={`/courses/${courseId}`} className="box">
                            <a class="inline-btn">view playlist</a>
                        </Link>
                        <button><AiOutlineLike></AiOutlineLike></button>
                    </form>
                    <p class="description">{video.description}</p>
                </div>

            </section>

            <section class="comments">

                <h1 class="heading">{commentsNumber} comments</h1>

                <form onSubmit={handleSubmit} className="add-comment">
                    <h3>add comments</h3>
                    <textarea
                        name="comment_box"
                        placeholder="enter your comment"
                        maxLength="1000"
                        cols="30"
                        rows="10"
                        value={postComment}
                        onChange={handleCommentChange}
                    ></textarea>
                    {error ? toast.error(error) : ''}
                    <input
                        type="submit"
                        value="add comment"
                        className="inline-btn"
                        name="add_comment"
                    />
                </form>

                <h1 class="heading">user comments</h1>

                <div class="box-container">
                    {comments.map((item, index) => (
                        <div class="box" key={index}>
                            <div class="user">
                                <img className='image' src={`data:image/jpeg;base64,${item.image}`} alt={item.user_name} />
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