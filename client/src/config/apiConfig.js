const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

export const endpoints = {
    courses: {
        allCourses: `${API_BASE_URL}/course/courses`,
        getCourseById: `${API_BASE_URL}/course/courses/:courseId`,
        //   getCourseVideos: `${API_BASE_URL}/course/:id`,
    },
    videos: {
        videosByCourse: `${API_BASE_URL}/videos/videos/:courseId`,
        videoDetails: `${API_BASE_URL}/videos/video/:id`, // Example with dynamic parameter
        videoCommentDetails: `${API_BASE_URL}/videos/video/:id/comments`,
        deleteVideoComment: `${API_BASE_URL}/videos/video/DeleteComment/:interactionId`,
        addVideoComment: `${API_BASE_URL}/videos/video/addComment/:userId`
        // Add more video endpoints as needed
    },
    about: {
        users: `${API_BASE_URL}/about/reviews`,
        facts: `${API_BASE_URL}/about/facts`,
        //   getCourseVideos: `${API_BASE_URL}/course/:id`,
    },
    user: {
        teacherProfile: `${API_BASE_URL}/user/user/teacherProfile/:teacherId`,
        teacherCourses: `${API_BASE_URL}/user/user/teacherCourses/:teacherId`,
    }
    // Add more endpoints for other components if needed
};
