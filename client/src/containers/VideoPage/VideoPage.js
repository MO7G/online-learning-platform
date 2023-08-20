import React, { useEffect, useState } from 'react'
import './VideoPage.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../config/apiConfig';
import { useParams } from 'react-router-dom';
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
                console.log("this is the playlistcoursevideo response ", response);
                setVideo(response.data);
            } catch (error) {
                // Handle error
            }
        }
        async function fetchComments() {

            try {
                const response = await axios.get(endpoints.videos.videoCommentDetails.replace(':id', videoId));
                console.log("this is the playlistcoursevideo response ", response);
                setCommentsNumber(response.data.numberOfComments[0].rowCount);
                setComments(response.data.comments);
            } catch (error) {
                // Handle error
            }
        }
        fetchCourses();
        fetchComments();
    }, []);

    const handleEditeComment = () => {

    }
    const handleDeleteComment = () => {

    }


    const [editModeIndex, setEditModeIndex] = useState(-1);
    const [editedComments, setEditedComments] = useState('');

    const handleEditComment = (index) => {
        setEditModeIndex(index);
        setEditedComments([...editedComments, comments[index].comment]);
    };

    const handleEditInput = (e, index) => {
        const newEditedComments = [...editedComments];
        newEditedComments[index] = e.target.innerText;
        setEditedComments(newEditedComments);
    };

    const handleEditChange = (e) => {
        setEditedComments(e.target.textContent);
        console.log(editedComments)
    }

    const handleCancelEdit = (itemIndex) => {
        // const itemIndex = comments.findIndex(item => item.user_id === id);
        // console.log(itemIndex)
        // Create a copy of the array to avoid direct mutation
        const updatedComments = [...comments];

        // Update the comment of the specific item in the copied array
        if (itemIndex !== -1) {
            setComments(updatedComments);
        }

        setEditModeIndex(-1);

        // Reset editedComments for the canceled comment
    };

    const handleEditSubmit = (itemIndex) => {
        // const itemIndex = comments.findIndex(item => item.user_id === id);
        // console.log(itemIndex)
        // Create a copy of the array to avoid direct mutation
        const updatedComments = [...comments];

        // Update the comment of the specific item in the copied array
        if (itemIndex !== -1) {
            console.log("yes")
            updatedComments[itemIndex] = { ...updatedComments[itemIndex], comment: editedComments };
            setComments(updatedComments);
        }

        setEditModeIndex(-1);
        setEditedComments('')

        // Reset editedComments for the canceled comment
    };

    const temp = () => {
        console.log(comments);
    }

    return (
        <div>
            <button onClick={temp}>asdfasfas</button>
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
                            {/* Render comment content based on edit mode */}
                            {editModeIndex === index ? (
                                <div
                                    className="comment-box"
                                    contentEditable="true"
                                    onInput={() => handleEditInput}
                                >
                                    {item.comment}
                                </div>
                            ) : (
                                <div className="comment-box">{item.comment}</div>
                            )}
                            <div class="flex-btn">
                                {/* Conditionally render the buttons */}
                                {user && user._id === item.user_id && (
                                    <>
                                        {editModeIndex === index ? (
                                            <>
                                                <button onClick={() => handleEditSubmit(index)}>Save</button>
                                                <button onClick={() => handleCancelEdit(index)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditComment(index)}>Edit</button>
                                                <button onClick={() => handleDeleteComment(index)}>Delete</button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}




                </div>

            </section >

        </div >
    )
}

export default VideoPage