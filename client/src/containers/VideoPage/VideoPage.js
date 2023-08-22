import React, { useEffect, useState } from 'react'
import './VideoPage.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { useParams } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import { BiSolidLike } from 'react-icons/bi'
import { FaCalendarDay } from 'react-icons/fa'
import { Navigate } from 'react-router-dom';


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
    const [isLiked, setIsLiked] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCourses() {

            try {
                const response = await axios.get(endpoints.videos.videoDetails.replace(':id', videoId));
                setVideo(response.data);
                setLikeCounter(response.data.likes_counter)
            } catch (error) {
                // Handle error
                console.log("this is the response info ", error);

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

        async function checkLike() {

            try {
                const requestData = {
                    courseId: courseId, // Replace with the actual course ID
                    userId: user._id,
                    comment: postComment,
                    videoId: videoId
                    // Replace with the actual user ID
                };
                const response = await axios.post(endpoints.videos.checkVideoLike.replace(':userId', videoId), requestData);
                setIsLiked(response.data.liked)
            } catch (error) {
                // Handle error
                console.log(error);
            }
        }
        fetchCourses();
        fetchComments();
        checkLike();
    }, []);


    const handleDeleteComment = async (index, InteractionId) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
        toast.success("comment deleted successfuly")
        try {
            const response = await axios.delete(endpoints.videos.deleteVideoComment.replace(':interactionId', InteractionId));
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
        if (user) {
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
                    toast.success("Your comment is added ")

                    setPostComment("");
                    setError(false);
                } catch (error) {
                    // Handle error
                    console.log(error)
                }
            }
        } else {
            navigate('/login');
            toast.error("You must login in ")
        }

    }





    const addLike = async () => {
        try {
            const requestData = {
                courseId: courseId, // Replace with the actual course ID
                userId: user._id,
                comment: postComment,
                videoId: videoId
                // Replace with the actual user ID
            };
            const response = await axios.post(endpoints.videos.addVideoLike.replace(':userId', user._id), requestData);
        } catch (error) {
            // Handle error
            console.log(error)
        }
    }


    const removeLike = async () => {
        try {
            const requestData = {
                courseId: courseId, // Replace with the actual course ID
                userId: user._id,
                videoId: videoId
                // Replace with the actual user ID
            };

            const response = await axios.delete(endpoints.videos.removeVideoLike.replace(':userId', requestData.userId), requestData);
        } catch (error) {
            // Handle error
            console.log(error)
        }
    }

    const handleLike = async (e) => {

        if (user) {
            if (!isLiked) {
                console.log("the add like is called")
                addLike();
                setIsLiked(true);
                setLikeCounter(likeCounter + 1);
            } else {
                console.log("the remove like is called")

                removeLike();
                setIsLiked(false);
                setLikeCounter(likeCounter - 1);
            }
        } else {
            navigate('/login');
            toast.error("You must login in ")

        }



    }









    return (
        <div>

            <section class="watch-video">

                <div class="video-container">
                    <div class="video" dangerouslySetInnerHTML={{ __html: video.videoLink }} />
                    <h3 class="title">{video.videoName}</h3>
                    <div class="info">
                        <p class="date"><FaCalendarDay className='dataIcons'></FaCalendarDay><span>{video.videoDate}</span></p>
                        <p class="date"><BiSolidLike className='likesIcons'></BiSolidLike><span>{likeCounter} likes</span></p>
                    </div>
                    <div class="tutor">
                        <img src={`data:image/jpeg;base64,${video.user_image}`} alt="" />

                        <div>
                            <h3>{video.user_name}</h3>
                            <span>{video.role}</span>
                        </div>
                    </div>
                    <div class="flex">
                        <Link key={video.videoId} to={`/courses/${courseId}`} className="box">
                            <a class="inline-btn">view playlist</a>
                        </Link>
                        <button className={`likebutton ${isLiked ? 'likeIconsOn' : 'likeIconsOff'}`} onClick={handleLike}>
                            <BiSolidLike className='likeIcon' />
                        </button>
                    </div>
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